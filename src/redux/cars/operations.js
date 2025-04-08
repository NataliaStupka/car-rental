import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchCars = createAsyncThunk(
  "car/fetchCars",
  async (page = 1, thunkAPI) => {
    try {
      const response = await axios.get(`/cars?page=${page}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const fetchCarsrsByBrand = createAsyncThunk(
  "cars/fetchCarsByBrand",
  async (brand, thunkAPI) => {
    try {
      const response = await axios.get(`/cars?brand=${brand}`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
