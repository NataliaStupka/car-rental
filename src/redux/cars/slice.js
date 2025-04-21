import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchAllCars, fetchCarById, fetchCarsByFilters } from "./operations";

const initialState = {
  items: [],
  carById: null,

  favoriteCars: [],

  isLoading: false,
  isError: null,

  currentPage: 1, //number
  totalPages: null,
  totalCars: null,
  // wasFetched: false, //?
  loadedPages: [], //масив завантажених сторінок
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

    incrementPage: (state) => {
      state.currentPage = Number(state.currentPage) + 1;
      console.log("Increment +1");
    },
    clearCars: (state) => {
      state.items = [];
      state.loadedPages = [];
      state.currentPage = 1;
    },
    resetPage: (state) => {
      state.currentPage = 1;
    },
  },
  //reducer
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCars.fulfilled, (state, action) => {
        const { cars, page, totalCars, totalPages } = action.payload;
        const pageNumber = Number(page);

        if (state.loadedPages.includes(pageNumber)) {
          console.log("Сторінка вже завантажена");
          return; // Не додаємо cars, якщо сторінка вже завантажена
        }
        //??????
        if (pageNumber === 1) {
          console.log("Це перша сторінка");
          state.items = cars;
        } else {
          console.log("до попередньої сторінки додамо ще сторіночку");
          state.items = [...state.items, ...cars];
        }
        state.currentPage = pageNumber;
        state.totalPages = Number(totalPages);
        state.totalCars = Number(totalCars);

        state.loadedPages = [...state.loadedPages, pageNumber];
        console.log("[завантажені сторінки]:", state.loadedPages);
      })
      .addCase(fetchCarsByFilters.fulfilled, (state, action) => {
        const { cars, totalCars, totalPages } = action.payload;
        state.items = cars;
        state.loadedPages = []; // Скидаємо при фільтрації
        state.currentPage = 1;
        state.totalCars = Number(totalCars);
        state.totalPages = Number(totalPages);
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.carById = action.payload;
      })

      //-- addMatcher --//
      .addMatcher(
        isAnyOf(
          fetchAllCars.pending,
          fetchCarsByFilters.pending,
          fetchCarById.pending
        ),
        (state) => {
          state.isLoading = true;
          state.isError = null; //false
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllCars.fulfilled,
          fetchCarsByFilters.fulfilled,
          fetchCarById.fulfilled
        ),
        (state) => {
          state.isLoading = false;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchAllCars.rejected,
          fetchCarsByFilters.rejected,
          fetchCarById.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.isError = true; //???
          state.isError = action.payload;
        }
      );
  },
});

export const {
  addFavoriteCar,
  deleteFavoriteCar,
  incrementPage,
  clearCars,
  resetPage,
} = slice.actions;
export const carsReducer = slice.reducer;
