import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchAllCars, fetchCarsByFilters } from "./operations";

const initialState = {
  items: [],
  selectedCar: null, //замінити на fetchById
  favoriteCars: [],

  isLoading: false,
  isError: null,

  currentPage: 1,
  totalPages: null,
  totalCars: null,
  wasFetched: false, //?
};

const slice = createSlice({
  name: "car",
  initialState,
  //   action
  reducers: {
    addFavoriteCar(state, action) {
      state.favoriteCars.push(action.payload);
    },
    deleteFavoriteCar(state, action) {
      state.favoriteCars = state.favoriteCars.filter(
        (item) => item.id !== action.payload
      );
    },

    //замінити на fetchCarById
    setSelectedCar: (state, action) => {
      console.log("selectedCar-", action.payload);
      state.selectedCar = action.payload;
    },
    //замінити
    incrementPage: (state) => {
      state.currentPage += 1;
    },
    clearCars: (state) => {
      state.items = [];
    },
  },
  //reducer
  extraReducers: (builder) => {
    builder
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

        state.wasFetched = true;
      })
      .addCase(fetchCarsByFilters.fulfilled, (state, action) => {
        const { cars } = action.payload;
        state.items = cars;
      })

      //-- addMatcher --//
      .addMatcher(
        isAnyOf(fetchAllCars.pending, fetchCarsByFilters.pending),
        (state) => {
          state.isLoading = true;
          state.isError = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchAllCars.fulfilled, fetchCarsByFilters.fulfilled),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(fetchAllCars.rejected, fetchCarsByFilters.rejected),
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.isError = action.payload;
        }
      );
  },
});

export const {
  addFavoriteCar,
  deleteFavoriteCar,
  setSelectedCar,
  incrementPage,
  clearCars,
} = slice.actions;
export const carsReducer = slice.reducer;
