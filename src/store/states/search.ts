//@ts-nocheck
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "..";


//slices
const slice = createSlice(
    {
        name: "search",
        initialState : "",
        reducers : {
            //actionNAme : reducer
            setSearch : (_ , action) => {
                return action.payload
            }
        }
    }
)
export default slice.reducer;

export const  {setSearch} = slice.actions;
export const { name } = slice;


//selectors 

export const selectSearch = (state: RootState) => state.search;