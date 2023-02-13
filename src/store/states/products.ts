//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { setPageCount } from "./pageCount";
import axios from "axios";
import { setIsLoading } from "./isLoading";
import {
  selectCategoryId,
  selectMaxPrice,
  selectMinPrice,
  selectSearch,
} from "./productFilters";
//slices
const slice = createSlice({
  name: "products",
  initialState: [],
  reducers: {
    // actionName: reducer
    addProductsToStore: (_, action) => {
      return action.payload;
    },
  },
});

export const { addProductsToStore } = slice.actions;
export default slice.reducer;

//selectors
export const selectProducts = (store: RootState) => store.products;
// export const selectIsLoading = (store: RootState) => store.isLoading;

//action
//first axios to get all products
const limit = 21;
export const getPageCount = () => (dispatch, getState) => {
  const state = getState();

  const search = selectSearch(state);
  const categoryId = selectCategoryId(state);
  const minPrice = selectMinPrice(state);
  const maxPrice = selectMaxPrice(state);

  return axios
    .get("https://api.escuelajs.co/api/v1/products/", {
      params: {
        title: search,
        categoryId,
        price_min: minPrice,
        price_max: maxPrice,
      },
    })
    .then((res) => res.data)
    .then((productsData) => {
      console.log(productsData);
      dispatch(setPageCount(Math.ceil(productsData.length / limit)));
    });
};

export const getPaginatedProducts = (currentPage) => (dispatch, getState) => {
  const state = getState();

  const search = selectSearch(state);
  const categoryId = selectCategoryId(state);
  const minPrice = selectMinPrice(state);
  const maxPrice = selectMaxPrice(state);

  dispatch(setIsLoading(true));
  return axios
    .get("https://api.escuelajs.co/api/v1/products", {
      params: {
        offset: (currentPage - 1) * limit,
        limit,
        title: search,
        categoryId,
        price_min: minPrice,
        price_max: maxPrice,
      },
    })
    .then((res) => res.data)
    .then((productsData) => {
      // setProducts(productsData);
      dispatch(addProductsToStore(productsData));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};
