import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";


const slice = createSlice(
    {
        name: "isLoading",
        initialState : true,
        reducers : {
            //actionNAme : reducer
            setIsLoading : (_ , action) => {
                return action.payload
            }
        }
    }
)
export default slice.reducer;


export const  {setIsLoading} = slice.actions;
export const { name } = slice;


//selectors 

export const selectIsLoading = (state: RootState) => state.isLoading;