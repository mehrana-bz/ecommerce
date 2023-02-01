//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { setPageCount } from "./pageCount";
import axios from "axios";
import { setIsLoading } from "./isLoading";
import { selectSearch } from "./search";
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
const limit = 25;
export const getPageCount = () => (dispatch, getState) => {
  const state = getState();

  const search = selectSearch(state);

  return axios
    .get(
      `https://api.escuelajs.co/api/v1/products/${
        search.length ? `?title=${search}` : ""
      }`
    )
    .then((res) => res.data)
    .then((productsData) => {
      console.log(productsData);
      dispatch(setPageCount(Math.ceil(productsData.length / limit)));
    });
};

export const getPaginatedProducts = (currentPage) => (dispatch, getState) => {
  const state = getState();
  const search = selectSearch(state);
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://api.escuelajs.co/api/v1/products?offset=${
        (currentPage - 1) * limit
      }&limit=${limit}${search.length ? `&title=${search}` : ""}`
    )
    .then((res) => res.data)
    .then((productsData) => {
      // setProducts(productsData);
      dispatch(addProductsToStore(productsData));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
};
