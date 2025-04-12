import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchAllCars = createAsyncThunk(
  "car/fetchAllCars",
  async (page = 1, thunkAPI) => {
    try {
      const response = await axios.get(`/cars?page=${page}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

// ======
export const fetchCarsByFilters = createAsyncThunk(
  "cars/fetchCarsByFilters",
  async ({ brand, price, mileageFrom, mileageTo }, thunkAPI) => {
    try {
      const params = new URLSearchParams();
      if (brand) params.append("brand", brand);
      if (price) params.append("rentalPrice", price);
      if (mileageFrom) params.append("minMileage", mileageFrom);
      if (mileageTo) params.append("maxMileage", mileageTo);

      const response = await axios.get(`cars?${params.toString()}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
