import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const slice = createSlice({
    name : "products",
    initialState : [],
    reducers: {
        // actionName: reducer
        addProductsToStore: (state , action) => {
            return state.concat(action.payload);
        }
    }
});

export const {addProductsToStore} = slice.actions;

export default slice.reducer;


//selectors
export const selectProducts = (store: RootState) => store.products;