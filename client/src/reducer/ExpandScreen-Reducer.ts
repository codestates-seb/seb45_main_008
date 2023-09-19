import { createSlice } from "@reduxjs/toolkit";

const initialState: { left: boolean; right: boolean } = { left: false, right: false };

const expandScreenSlice = createSlice({
  name: "expandScreen",
  initialState: initialState,
  reducers: {
    changeLeftScreen: (state) => {
      state.left ? (state.left = false) : (state.left = true);
      return state;
    },
    changeRightScreen: (state) => {
      state.right ? (state.right = false) : (state.right = true);
      return state;
    },
  },
});

export const { changeLeftScreen, changeRightScreen } = expandScreenSlice.actions;
export const expandScreenReducer = expandScreenSlice.reducer;
