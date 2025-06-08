import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appReducer from "./slices/appSlice";
import authReducer from "./slices/authSlice";
import { mainApi } from "../api/mainApi.ts";

// Определение типа RootState
export type RootState = ReturnType<typeof store.getState>;

const persistedAppReducer = persistReducer({ key: "app", storage }, appReducer);
const persistedAuthReducer = persistReducer(
  { key: "auth", storage },
  authReducer,
);

const store = configureStore({
  reducer: {
    app: persistedAppReducer,
    auth: persistedAuthReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      mainApi.middleware,
    ),
});

const persistor = persistStore(store);

export { persistor, store };
