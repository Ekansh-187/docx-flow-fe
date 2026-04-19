import { combineReducers } from "redux";
import authUserReducer, { authUserInitialState } from "./auth-user/slice";
import { iLoveDoxApiSlice } from "@/rtk-query";

export const initialState = {
  authUser: authUserInitialState,
  [iLoveDoxApiSlice.reducerPath]: {},
};

export function createReducer(injectedReducers = {}) {
  return combineReducers({
    authUser: authUserReducer,
    [iLoveDoxApiSlice.reducerPath]: iLoveDoxApiSlice.reducer,
    ...injectedReducers,
  });
}
