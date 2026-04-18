import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IAuthUserState {
  token: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

export const authUserInitialState: IAuthUserState = {
  token: null,
  email: null,
  isAuthenticated: false,
};

const authUserSlice = createSlice({
  name: "authUser",
  initialState: authUserInitialState,
  reducers: {
    loginUser: (
      state,
      { payload }: PayloadAction<{ token: string; email: string }>
    ) => {
      state.token = payload.token;
      state.email = payload.email;
      state.isAuthenticated = true;
    },
    logoutUser: () => authUserInitialState,
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
  },
});

export const { loginUser, logoutUser, setToken } = authUserSlice.actions;
export default authUserSlice.reducer;
