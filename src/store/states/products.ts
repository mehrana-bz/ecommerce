import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";
//slices
const slice = createSlice({
    name : "products",
    initialState : [],
    reducers: {
        // actionName: reducer
        addProductsToStore: (_ , action) => {
            return action.payload;
        }
    }
});


export const {addProductsToStore} = slice.actions;
export default slice.reducer;


//selectors
export const selectProducts = (store: RootState) => store.products;
// export const selectIsLoading = (store: RootState) => store.isLoading;