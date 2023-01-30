//@ts-nocheck
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

const slice = createSlice({
    name : "pageCount",
    initialState: 0,
    reducers : {
        setPageCount : (_ , action) => {
            return action.payload
        }
    }
})

export default slice.reducer;


export const {name} = slice;
export const {setPageCount} = slice.actions;


export const selectPageCount = (state: RootState) => state.pageCount;