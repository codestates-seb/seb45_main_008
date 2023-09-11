import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

const stockPriceOrderSlice = createSlice({
  name: "stockOrderPrice",
  initialState: initialState,
  reducers: {
    setStockOrderPrice: (state, action) => {
      state = action.payload;
      return state;
    },
    plusStockOrderPrice: (state, action) => state + action.payload,
    minusStockOrderPrice: (state, action) => (state > action.payload ? state - action.payload : state),
  },
});

export const { setStockOrderPrice, plusStockOrderPrice, minusStockOrderPrice } = stockPriceOrderSlice.actions;
export const stockOrderPriceReducer = stockPriceOrderSlice.reducer;
