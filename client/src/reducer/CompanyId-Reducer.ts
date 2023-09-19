import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 1;

const companyIdSlice = createSlice({
  name: "companyId",
  initialState: initialState,
  reducers: {
    changeCompanyId: (state, action) => {
      state = action.payload;
      return state;
    },
  },
});

export const { changeCompanyId } = companyIdSlice.actions;
export const companyIdReducer = companyIdSlice.reducer;
