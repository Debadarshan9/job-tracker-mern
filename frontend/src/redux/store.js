import { configureStore } from "@reduxjs/toolkit";
import jobReducer from "./job/slice.js";
export const store = configureStore({
  reducer: {
    jobs: jobReducer,
  },
});
