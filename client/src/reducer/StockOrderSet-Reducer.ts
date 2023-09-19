import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const stockOrderSetSlice = createSlice({
  name: "stockOrderSet",
  initialState: initialState,
  reducers: {
    stockOrderOpen: () => true,
    stockOrderClose: () => false,
  },
});

export const { stockOrderOpen, stockOrderClose } = stockOrderSetSlice.actions;
export const stockOrderSetReducer = stockOrderSetSlice.reducer;
