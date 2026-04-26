import { combineReducers } from "redux";
import { iLoveDoxApiSlice } from "@/rtk-query";

export const initialState = {
  [iLoveDoxApiSlice.reducerPath]: {},
};

export function createReducer(injectedReducers = {}) {
  return combineReducers({
    [iLoveDoxApiSlice.reducerPath]: iLoveDoxApiSlice.reducer,
    ...injectedReducers,
  });
}
