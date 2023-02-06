import { Module } from "vuex";
import { RootState } from "../index";
import { UserInfo } from "@/types/service";

export const userState: Module<UserInfo, RootState> = {
  namespaced: true,
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
      console.log(value);
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
};
