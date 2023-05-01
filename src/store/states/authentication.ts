import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "..";
import axios from "axios";

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

// thunk Actions

export const loginUser =
  (email: string, password: string): AppThunk<Promise<any>> =>
  (dispatch) => {
    return  axios
      .post(" https://api.escuelajs.co/api/v1/auth/login", {
        email: email,
        password: password,
      })
      .then(async ({ data: { access_token, refresh_token } }) => {

        //setTimeout to refresh accessToken
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        await axios.get("https://api.escuelajs.co/api/v1/auth/profile")
        .then(res => res.data)
        .then(user => {
          dispatch(setUser(user));
        });

        localStorage.setItem(
          "authToken",
          JSON.stringify({
            accessToken: access_token,
            refreshToken: refresh_token,
            createdAt: Date.now(),
          })
        );

        dispatch(setIsLogin(true));
      });
  };

 