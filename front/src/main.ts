import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import { Store } from "vuex";
import axios from "axios";
import { UserInfo } from "./types/service";

// TODO : 폴더 분리하기
declare module "vue" {
  interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

declare module "@vue/runtime-core" {
  // declare your own store states

  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<UserInfo>;
  }
}

const app = createApp(App);
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
axios.interceptors.request.use((request) => {
  const accessToken = store.getters.getAccessToken;

  if (accessToken) {
    request.headers.set(
      "Authorization",
      `${process.env.VUE_APP_ACCESS_TOKEN_KEY} ${accessToken}`
    );
  }
  return request;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 419) {
      if (error.response.data.code === "expired") {
        const originalRequest = config;

        const {
          data: { data },
        } = await axios.post("/api/token/refresh-token");
        store.commit("setAccessToken", data.accessToken);

        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

app.config.globalProperties.$axios = axios;

app.use(store).use(router).mount("#app");
