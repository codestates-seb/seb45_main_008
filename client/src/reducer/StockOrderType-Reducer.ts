import { createSlice } from "@reduxjs/toolkit";

// [true] 매도, [false] 매수
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
