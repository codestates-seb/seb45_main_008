import { createSlice } from "@reduxjs/toolkit";
import { dummyPrice } from "../components/StockOrderSection/dummyData";

const initialState: number = dummyPrice[10].price;

const stockPriceOrderSlice = createSlice({
  name: "stockOrderPrice",
  initialState: initialState,
  reducers: {
    setStockOrderPrice: (state, action) => {
      return action.payload;
    },
    plusStockOrderPrice: (state, action) => {
      return state + action.payload;
    },
    minusStockOrderPrice: (state, action) => {
      if (state > action.payload) {
        return state - action.payload;
      }
      return state;
    },
  },
});

export const { setStockOrderPrice, plusStockOrderPrice, minusStockOrderPrice } = stockPriceOrderSlice.actions;
export const stockOrderPriceReducer = stockPriceOrderSlice.reducer;
