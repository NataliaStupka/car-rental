import { createSlice } from "@reduxjs/toolkit";
import { fetchAllCars, fetchCarsByFilters } from "./operations";

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
    clearCars: (state) => {
      state.items = [];
    },
    // clearBrandCars: (state) => {
    //   state.brandItems = [];
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCars.pending, handlePending)
      .addCase(fetchAllCars.fulfilled, (state, action) => {
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
      .addCase(fetchAllCars.rejected, handleRejected)
      //====
      .addCase(fetchCarsByFilters.fulfilled, (state, action) => {
        const { cars } = action.payload;
        console.log("&&&=====allFilters", cars);
        state.items = cars;
        state.isLoading = false;
      });
  },
});

export const { setSelectedCar, incrementPage, clearCars } = slice.actions;
export const carReducer = slice.reducer;
