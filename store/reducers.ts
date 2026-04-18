import { combineReducers } from "redux";
import authUserReducer, { authUserInitialState } from "./auth-user/slice";
import { docxFlowApiSlice } from "@/rtk-query";

export const initialState = {
  authUser: authUserInitialState,
  [docxFlowApiSlice.reducerPath]: {},
};

export function createReducer(injectedReducers = {}) {
  return combineReducers({
    authUser: authUserReducer,
    [docxFlowApiSlice.reducerPath]: docxFlowApiSlice.reducer,
    ...injectedReducers,
  });
}
