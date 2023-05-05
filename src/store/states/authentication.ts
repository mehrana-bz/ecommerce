import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "..";
import axios from "axios";

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  createdAt: number;
}
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
let refreshTokenTimeoutKey: NodeJS.Timeout | undefined;
const refreshAuthToken = (
  refreshToken: AuthToken["refreshToken"],
  createdAt: AuthToken["createdAt"]
) => {
  const expirationLimit = 10 * 60 * 60 - 2 * 60;
  const expire = expirationLimit - (Date.now() - createdAt) / 1000;
  const expireInMS = Math.floor(expire * 1000);

  if (expireInMS < 0) return;

  refreshTokenTimeoutKey = setTimeout(() => {
    axios
      .post<{
        access_token: string;
        refresh_token: string;
      }>("https://api.escuelajs.co/api/v1/auth/refresh-token", {
        refreshToken: refreshToken,
      })
      .then(({ data: { access_token, refresh_token } }) => {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        const now = Date.now();
        localStorage.setItem(
          "authToken",
          JSON.stringify({
            accessToken: access_token,
            refreshToken: refresh_token,
            createdAt: now,
          } as AuthToken)
        );

        refreshAuthToken(refresh_token, now);
      });
  }, expireInMS);
};

export const loadUser =
  (): AppThunk<Promise<any> | undefined> => (dispatch) => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) return;

    const { accessToken, refreshToken, createdAt }: AuthToken =
      JSON.parse(authToken);

    //setTimeout to refresh accessToken
    refreshAuthToken(refreshToken, createdAt);

    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    return axios
      .get("https://api.escuelajs.co/api/v1/auth/profile")
      .then((res) => res.data)
      .then((user) => {
        dispatch(setUser(user));
        dispatch(setIsLogin(true));
      });
  };

export const loginUser =
  (email: string, password: string): AppThunk<Promise<any>> =>
  (dispatch) => {
    return axios
      .post(" https://api.escuelajs.co/api/v1/auth/login", {
        email: email,
        password: password,
      })
      .then(async ({ data: { access_token, refresh_token } }) => {
        localStorage.setItem(
          "authToken",
          JSON.stringify({
            accessToken: access_token,
            refreshToken: refresh_token,
            createdAt: Date.now(),
          } as AuthToken)
        );

        await dispatch(loadUser());
      });
  };

export const logout = (): AppThunk<void>  => (dispatch) => {
  localStorage.removeItem("authToken");
  dispatch(setUser(undefined));
  delete axios.defaults.headers.common["Authorization"];
  dispatch(setIsLogin(false));
  clearTimeout(refreshTokenTimeoutKey);
};
