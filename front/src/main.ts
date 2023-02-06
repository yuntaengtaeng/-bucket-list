import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// // TODO : 폴더 분리하기
declare module "vue" {
  interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

const app = createApp(App);
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
axios.interceptors.request.use((request) => {
  store.commit("loadingState/onLoading");

  const accessToken = store.getters["userState/getAccessToken"];

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
    store.commit("loadingState/offLoading");
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
        const refreshTokenKey = store.getters["userState/getRefreshTokenKey"];

        const {
          data: { data },
        } = await axios.post(
          "/api/token/refresh-token",
          {},
          {
            headers: {
              refreshTokenKey: `${process.env.VUE_APP_ACCESS_TOKEN_KEY} ${refreshTokenKey}`,
            },
          }
        );
        store.commit("userState/setAccessToken", data.accessToken);

        return axios(originalRequest);
      }
    }
    store.commit("loadingState/offLoading");
    return Promise.reject(error);
  }
);

app.config.globalProperties.$axios = axios;

app.use(store).use(router).mount("#app");
