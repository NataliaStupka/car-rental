import { createSlice } from "@reduxjs/toolkit";
import { fetchCars } from "./operations";

const initialState = {
  items: [],
  selectedCar: null,
  isLoading: false,
  isError: null,
  currentPage: 1,
  totalPages: null,
  totalCars: null,
  wasFetched: false,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.isError = false; //??
};
const handleRejected = (state, { payload }) => {
  console.log("ERRor-rejected", payload);
  state.isLoading = false;
  state.isError = payload;
  state.isError = true; //???
};

const slice = createSlice({
  name: "car",
  initialState,
  //   action
  reducers: {
    setSelectedCar: (state, action) => {
      console.log("selectedCar-", action.payload);
      state.selectedCar = action.payload;
    },
    incrementPage: (state) => {
      state.currentPage += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, handlePending)
      .addCase(fetchCars.fulfilled, (state, action) => {
        const { cars, page, totalCars, totalPages } = action.payload;
        if (page === 1) {
          state.items = cars;
        } else {
          state.items = [...state.items, ...cars];
        }
        state.page = page;
        state.totalPages = totalPages;
        state.totalCars = totalCars;

        state.isLoading = false;
        state.wasFetched = true;
      })
      .addCase(fetchCars.rejected, handleRejected);
  },
});

export const { setSelectedCar, incrementPage, clearCars } = slice.actions;
export const carReducer = slice.reducer;
