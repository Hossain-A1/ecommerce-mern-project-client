import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverURL } from "../../../secret";
// Create Async Thunk for fetching all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async ({ endpoint, page = 1, limit = 12 }, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${serverURL}/api/${endpoint}?page=${page}&limit=${limit}`
      );
      if (res.data.success) {
        return res.data.payload;
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
  pagination: {
    totalPages: 1,
    currentPage: 1,
    nextPage: null,
    prevPage: null,
    totalProducts: 0,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload; // Update the current page
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.products; 
        state.pagination = {
          totalPages: action.payload.pagination.totalpage,
          currentPage: action.payload.pagination.currentPage,
          nextPage: action.payload.pagination.nextPage,
          prevPage: action.payload.pagination.prevPage,
          totalProducts: action.payload.pagination.totalNumberOfProducts,
        };
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = productSlice.actions;
export default productSlice.reducer;
