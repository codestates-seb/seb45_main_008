import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const stockOrderTypeSlice = createSlice({
  name: "stockOrderType",
  initialState: initialState,
  reducers: {
    orderTypeBuying: () => {
      return false;
    },
    orderTypeSelling: () => {
      return true;
    },
  },
});

export const { orderTypeBuying, orderTypeSelling } = stockOrderTypeSlice.actions;
export const stockOrderTypeReducer = stockOrderTypeSlice.reducer;
