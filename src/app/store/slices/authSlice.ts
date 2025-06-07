import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface IToken {
  access_token: string;
  refresh_token: string;
}

export interface IUser {
  access_token: string;
  refresh_token: string;
}

interface AuthState {
  token: IToken | null;
  user: IUser | null;
}

const initialState: AuthState = {
  token: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (
      state,
      action: PayloadAction<{ user: IUser; token: IToken }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    clearToken: (state) => {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;

export const selectToken = (state: { auth: AuthState }) => state.auth.token;

export default authSlice.reducer;
