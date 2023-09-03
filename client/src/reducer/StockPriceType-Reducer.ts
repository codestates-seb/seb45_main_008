import { createSlice } from "@reduxjs/toolkit";

const initialState: boolean = false;

const stockPriceTypeSlice = createSlice({
  name: "stockPriceType",
  initialState: initialState,
  reducers: {
    setSpecifiedPrice: () => false,
    setMarketPrice: () => true,
  },
});

export const { setSpecifiedPrice, setMarketPrice } = stockPriceTypeSlice.actions;
export const stockPriceTypeReducer = stockPriceTypeSlice.reducer;
