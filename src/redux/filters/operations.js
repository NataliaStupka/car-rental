import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://car-rental-api.goit.global";

export const fetchBrands = createAsyncThunk(
  "filter/fetchBrands",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/brands");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
