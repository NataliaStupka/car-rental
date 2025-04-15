import { configureStore } from "@reduxjs/toolkit";
import { carsReducer } from "./cars/slice";
import { filterReducer } from "./filters/slice";

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
import storage from "redux-persist/lib/storage"; //persist

//persist
const persistConfig = {
  key: "favoritePersistor", // як буде записано в LocalStorage
  version: 1,
  storage,
  whitelist: ["favoriteCars"], // властивість state.car.favoriteCars
};

//обгортка persist
const persistedCarsReducer = persistReducer(persistConfig, carsReducer);

export const store = configureStore({
  reducer: {
    car: persistedCarsReducer,
    filter: filterReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
