import { configureStore } from "@reduxjs/toolkit";
import type { Reducer, AnyAction } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialState, createReducer } from "./reducers";
import { iLoveDoxApiSlice } from "@/rtk-query";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [], // auth tokens stored in localStorage directly
};

const persistedReducer = persistReducer(
  persistConfig,
  createReducer() as Reducer<any, AnyAction>
);

export const createAppStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          ignoredPaths: [
            `${iLoveDoxApiSlice.reducerPath}.queries`,
            `${iLoveDoxApiSlice.reducerPath}.mutations`,
          ],
        },
      }).concat(iLoveDoxApiSlice.middleware),
    preloadedState: initialState as any,
    devTools: process.env.NODE_ENV !== "production",
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

const { store, persistor } = createAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };
