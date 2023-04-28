import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface AuthenticationState {
  isLogin: boolean;
  user?: {
    id: number;
    email: string;
    password: string;
    name: string;
    role: "customer" | "admin";
    avatar: string;
  };
}

const initialState: AuthenticationState = {
  isLogin: false,
  user: undefined,
};

const slice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setIsLogin: (
      state,
      action: PayloadAction<AuthenticationState["isLogin"]>
    ) => {
      state.isLogin = action.payload;
    },
    setUser: (state, action: PayloadAction<AuthenticationState["user"]>) => {
      state.user = action.payload;
    },
  },
});

export default slice.reducer;

export const { setIsLogin, setUser } = slice.actions;

//selectors

export const selectIsLogin = (state: RootState) => state.authentication.isLogin;
export const selectUser = (state: RootState) => state.authentication.user;
