import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// TODO : 폴더 분리하기
declare module "vue" {
  interface ComponentCustomProperties {
    $axios: typeof axios;
  }
}

const app = createApp(App);
axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URI;
app.config.globalProperties.$axios = axios;

app.use(store).use(router).mount("#app");
