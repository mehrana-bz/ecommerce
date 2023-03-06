import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "./products";
import { RootState } from "..";

export type Cart = {
  id: Product["id"];
  count: number;
};
type CartsState = Cart[];

const initialState: CartsState = [];

const slice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {
    addProductToCart: (state,{ payload: productId }: PayloadAction<Cart["id"]>) => {
      const foundElementOfArray = state.find((element) => element.id === productId);
      
      if (foundElementOfArray) {
        foundElementOfArray.count++;
      } else {
        state.push({
          id: productId,
          count: 1,
        });
      }

      return state;
    },
    decrementProductInCart: (state,{payload:productId}: PayloadAction<Cart["id"]>) => {
      const foundElementOfArray = state.find((element) => element.id === productId);
      
      if (foundElementOfArray && foundElementOfArray.count > 1) {
        foundElementOfArray.count--;
      }

      return state;
    },
    removeProductFromCart: (state,{payload:productId}: PayloadAction<Cart["id"]>) => {
      return state.filter((element) => element.id !== productId);
    }
  },
});

export default slice.reducer;
export const {addProductToCart, decrementProductInCart,removeProductFromCart} = slice.actions;

export const selectShoppingCart = (state: RootState) => state.shoppingCart;
