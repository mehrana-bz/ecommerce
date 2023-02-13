import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "..";
import { setPageCount } from "./pageCount";
import axios from "axios";
import { setIsLoading } from "./isLoading";
import {
  selectCategoryId,
  selectMaxPrice,
  selectMinPrice,
  selectSearch,
} from "./productFilters";

//TYPES
export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
};
type ProductsState = Product[];
const initialState: ProductsState = [];
//slices
const slice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // actionName: reducer
    addProductsToStore: (_, action: PayloadAction<ProductsState>) => {
      return action.payload;
    },
  },
});

export const { addProductsToStore } = slice.actions;
export default slice.reducer;

//selectors
export const selectProducts = (state: RootState) => state.products;

//action
//first axios to get all products
const limit = 21;
export const getPageCount = (): AppThunk => (dispatch, getState) => {
  const state = getState();

  const search = selectSearch(state);
  const categoryId = selectCategoryId(state);
  const minPrice = selectMinPrice(state);
  const maxPrice = selectMaxPrice(state);

  return axios
    .get<ProductsState>("https://api.escuelajs.co/api/v1/products/", {
      params: {
        title: search,
        categoryId,
        price_min: minPrice,
        price_max: maxPrice,
      },
    })
    .then((res) => res.data)
    .then((productsData) => {
      dispatch(setPageCount(Math.ceil(productsData.length / limit)));
    });
};

export const getPaginatedProducts =
  (currentPage: number): AppThunk =>
  (dispatch, getState) => {
    const state = getState();

    const search = selectSearch(state);
    const categoryId = selectCategoryId(state);
    const minPrice = selectMinPrice(state);
    const maxPrice = selectMaxPrice(state);

    dispatch(setIsLoading(true));
    return axios
      .get<ProductsState>("https://api.escuelajs.co/api/v1/products", {
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
        dispatch(addProductsToStore(productsData));
      })
      .finally(() => {
        dispatch(setIsLoading(false));
      });
  };
