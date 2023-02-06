import { Module } from "vuex";
import { RootState } from "../index";

export interface LoadingState {
  isLoading: boolean;
}

export const loadingState: Module<LoadingState, RootState> = {
  namespaced: true,
  state: () => ({
    isLoading: false,
  }),
  mutations: {
    onLoading(state) {
      state.isLoading = true;
    },
    offLoading(state) {
      state.isLoading = false;
    },
  },
  getters: {},
  actions: {},
};
