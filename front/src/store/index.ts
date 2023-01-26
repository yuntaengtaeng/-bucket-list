// store.ts
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { UserInfo } from "@/types/service";

// define injection key
export const key: InjectionKey<Store<UserInfo>> = Symbol();

export const store = createStore<UserInfo>({
  state: {
    nickname: "",
    accessToken: "",
  },
  getters: {
    getIsLoggedIn(state) {
      return !!state.nickname;
    },
    getNickname(state) {
      return state.nickname;
    },
    getAccessToken(state) {
      return state.accessToken;
    },
  },
  mutations: {
    setData(state, value) {
      state.nickname = value.nickname;
      state.accessToken = value.accessToken;
    },
    initData(state) {
      state.nickname = "";
      state.accessToken = "";
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
  },
});
