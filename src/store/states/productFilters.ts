import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

//TYPES
interface InitialState {
  search: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}
//initialStates
const initialState: InitialState = {
  search: "",
  categoryId: undefined,
  minPrice: undefined,
  maxPrice: undefined,
};

//slices
const slice = createSlice({
  name: "productFilters",
  initialState,
  reducers: {
    //actionNAme : reducer
    setSearch: (state, action: PayloadAction<InitialState["search"]>) => {
      state.search = action.payload;
    },
    setCategoryId: (
      state,
      action: PayloadAction<InitialState["categoryId"]>
    ) => {
      state.categoryId = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<InitialState["minPrice"]>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<InitialState["maxPrice"]>) => {
      state.maxPrice = action.payload;
    },
  },
});
export default slice.reducer;

export const { setSearch, setCategoryId, setMaxPrice, setMinPrice } =
  slice.actions;

export const { name } = slice;

//selectors

export const selectSearch = (state: RootState) => state.productFilters.search;
export const selectCategoryId = (state: RootState) =>
  state.productFilters.categoryId;
export const selectMaxPrice = (state: RootState) =>
  state.productFilters.maxPrice;
export const selectMinPrice = (state: RootState) =>
  state.productFilters.minPrice;
