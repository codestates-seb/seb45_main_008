import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setLoginState: () => {
      return 1;
    },
    setLogoutState: () => {
      return 0;
    },
  },
});

export const { setLoginState, setLogoutState } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
