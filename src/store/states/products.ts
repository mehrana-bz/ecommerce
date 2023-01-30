//@ts-nocheck
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
import { setPageCount } from "./pageCount";
import axios from "axios";
import { setIsLoading } from "./isLoading";
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
const limit = 20;
export const getPageCount = () => (dispatch) =>
  axios
    .get("https://api.escuelajs.co/api/v1/products")
    .then((res) => res.data)
    .then((productsData) => {
      dispatch(setPageCount(Math.ceil(productsData.length / limit)));
    });



export const getPaginatedProducts = (currentPage) => (dispatch) => {
  dispatch(setIsLoading(true));
  return axios
    .get(
      `https://api.escuelajs.co/api/v1/products?offset=${
        (currentPage - 1) * limit
      }&limit=${limit}`
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
