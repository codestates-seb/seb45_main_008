import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

const stockOrderVolumeSlice = createSlice({
  name: "stockOrderVolume",
  initialState: initialState,
  reducers: {
    setStockOrderVolume: (_, action) => action.payload,
    plusStockOrderVolume: (state) => state + 1,
    minusStockOrderVolume: (state) => state - 1,
  },
});

export const { setStockOrderVolume, plusStockOrderVolume, minusStockOrderVolume } = stockOrderVolumeSlice.actions;
export const stockOrderVolumeReducer = stockOrderVolumeSlice.reducer;
