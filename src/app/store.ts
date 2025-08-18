// src/app/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// reducers
import authReducer from "@/features/auth/model/authSlice";
import objectFormReducer from "@/features/object-management/slices/objectFormSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  objectForm: objectFormReducer, // 👈 имя совпадает с селектором state.objectForm
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // 👈 сохраняем только auth (чтобы форма не "залипала" после refresh)
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

