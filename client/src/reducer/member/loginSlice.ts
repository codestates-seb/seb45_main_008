import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    setLoginState: (state) => {
      state = 1;
      return state;
    },
    setLogoutState: (state) => {
      state = 0;
      return state;
    },
  },
});

export const { setLoginState, setLogoutState } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
