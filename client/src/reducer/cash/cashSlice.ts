import { createSlice } from "@reduxjs/toolkit";

const cashSlice = createSlice({
  name: "cash",
  initialState: {
    cashId: null,
    money: null,
  },
  reducers: {
    setCashId: (state, action) => {
      state.cashId = action.payload;
    },
    setMoney: (state, action) => {
      state.money = action.payload;
    },
  },
});

export const { setCashId, setMoney } = cashSlice.actions;
export default cashSlice.reducer;