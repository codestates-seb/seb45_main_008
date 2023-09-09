import { createSlice } from "@reduxjs/toolkit";

// 🟢 코스피 API 요청 500번 에러로 인한 임시수정
// const initialState: number = 0;
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
