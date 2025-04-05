import { configureStore } from "@reduxjs/toolkit";
import { carReducer } from "./cars/slice";
import { filterReducer } from "./filters/slice";

export const store = configureStore({
  reducer: {
    car: carReducer,
    filter: filterReducer,
  },
});
