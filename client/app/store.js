import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../app/authSlice";
import courseReducer from "../app/courseSlice";
import { courseApi } from "../src/features/api/courseApi";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authApi } from "@/features/api/authApi";

// Combine reducers for persistence
const rootReducer = combineReducers({
  auth: authReducer,
  courses: courseReducer,
  [authApi.reducerPath]: authApi.reducer,
  [courseApi.reducerPath]: courseApi.reducer,
});

const persistConfig = {
  key: "AcademIQ",
  storage,
  whitelist: ["auth", "courses", "user"], // Persist auth and courses slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(authApi.middleware, courseApi.middleware),
});

export const persistor = persistStore(store);


