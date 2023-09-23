import { createSlice } from "@reduxjs/toolkit";

const initialState = 0;

const leftStockListSlice = createSlice({
  name: "leftStockListType",
  initialState: initialState,
  reducers: {
    setStockListType: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setStockListType } = leftStockListSlice.actions;
export const leftStockListReducer = leftStockListSlice.reducer;
