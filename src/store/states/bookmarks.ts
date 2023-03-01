import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "./products";
import { RootState } from "..";

type Bookmark = Product['id'];
type BookmarksState = Bookmark[];


const initialState: BookmarksState = [];

const slice = createSlice({
    name: "bookmarks",
    initialState,
    reducers: {
        toggleBookmark : (state , action: PayloadAction<Bookmark>) => {
            if(state.includes(action.payload)){
               return state.filter((id) => id !== action.payload);

            }else{
                 state.push(action.payload)
                 return state;
            }
        }
    }
})

export default slice.reducer;
export const {toggleBookmark} = slice.actions;

export const selectBookmarks = (state: RootState) => state.bookmarks;