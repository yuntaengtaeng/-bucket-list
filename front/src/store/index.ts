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
    refreshTokenKey: "",
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
    getRefreshTokenKey(state) {
      return state.refreshTokenKey;
    },
  },
  mutations: {
    setData(state, value) {
      state.nickname = value.nickname;
      state.accessToken = value.accessToken;
      state.refreshTokenKey = value.refreshTokenKey;
    },
    initData(state) {
      state.nickname = "";
      state.accessToken = "";
      state.refreshTokenKey = "";
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
    },
  },
});
