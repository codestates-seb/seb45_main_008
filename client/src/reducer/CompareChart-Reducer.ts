import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const compareChartSlice = createSlice({
  name: "compareChart",
  initialState: initialState,
  reducers: {
    setCompareStock: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { setCompareStock } = compareChartSlice.actions;
export const compareChartReducer = compareChartSlice.reducer;
