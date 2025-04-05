import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brand: "",
  price: "",
  mileageFrom: "",
  mileageTo: "",
};

const slice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeFilter: (state, action) => {
      console.log("Filter Payload", action.payload);
      const { name, value } = action.payload;
      state[name] = value;
    },
  },
});

export const { changeFilter } = slice.actions;

export const filterReducer = slice.reducer;
