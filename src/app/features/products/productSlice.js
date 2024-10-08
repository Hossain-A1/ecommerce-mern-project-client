import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverURL } from "../../../secret";
// Create Async Thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  'products',
  async (endpoint, { rejectWithValue }) => {
    try {
      const res = await axios.get(serverURL + `/api/${endpoint}`);
      if (res.data.success) {
        return res.data.payload.products;
      } else {
        return rejectWithValue("Something went wrong");
      }
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload; // Update products on success
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Handle error
      });
  },
});

export default productSlice.reducer;
