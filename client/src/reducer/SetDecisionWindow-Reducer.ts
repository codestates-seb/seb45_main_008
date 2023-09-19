import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const setDecisionWindow = createSlice({
  name: "stock order decision window",
  initialState: initialState,
  reducers: {
    openDecisionWindow: () => true,
    closeDecisionWindow: () => false,
  },
});

export const { openDecisionWindow, closeDecisionWindow } = setDecisionWindow.actions;
export const setDecisionWindowReducer = setDecisionWindow.reducer;
