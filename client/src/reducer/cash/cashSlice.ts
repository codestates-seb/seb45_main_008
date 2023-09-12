// store/cashSlice.ts
import { createSlice } from "@reduxjs/toolkit";

const cashSlice = createSlice({
  name: "cash",
  initialState: {
    cashId: null,
    cashAmount: null,
  },
  reducers: {
    setCashId: (state, action) => {
      state.cashId = action.payload;
    },
    setCashAmount: (state, action) => {
      state.cashAmount = action.payload;
    },
  },
});

export const { setCashId, setCashAmount } = cashSlice.actions;
export default cashSlice.reducer;
