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
import { docxFlowApiSlice } from "@/rtk-query";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authUser"], // only persist auth slice
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
            `${docxFlowApiSlice.reducerPath}.queries`,
            `${docxFlowApiSlice.reducerPath}.mutations`,
          ],
        },
      }).concat(docxFlowApiSlice.middleware),
    preloadedState: initialState as any,
    devTools: process.env.NODE_ENV !== "production",
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

const { store, persistor } = createAppStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export * from "./actions";
export { store, persistor };
