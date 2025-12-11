import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "../src/store/apiSlice";

export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      [apiSlice.reducerPath]: apiSlice.reducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
  });
};

export default createTestStore;
