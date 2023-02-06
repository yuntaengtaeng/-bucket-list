import { createStore } from "vuex";
import { userState } from "@/store/modules/User";
import { UserInfo } from "@/types/service";
import { LoadingState, loadingState } from "./modules/Loading";

export interface RootState {
  userState: UserInfo;
  loadingState: LoadingState;
}

export default createStore({
  modules: { userState, loadingState },
});
