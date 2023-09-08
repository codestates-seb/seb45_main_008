import { createSlice } from "@reduxjs/toolkit";

const initialState: number = 0;

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

// ///
// import createSlice

// const Slice <- reducer, action 같이

// const companyIdSlice = createSlice({
//   ///
//   name: 'companyId',
//   initialState:

// })

// /// action <- 상태를 변경하는 행위 <- 여러개가 존재할 수 잇다
// // store <- 상태는 여러개인데,,,,
// /// 상태를 관리하는 <- reducer는 1개 <-
// /// redcuer를 통해서 변경할 수 잇는 상태의 개수는 여러개

// /// number 상태를 만들었다
// /// reducer 1개
// /// +1, -1, *100, %100,,,,, <- action

// // action.payload <- 관용어구 ////

// // action 생성자 함수
// // -> plusState: (state, action) => {return state+ 2}

// // dispatch( plusState(2 === action.payload) )

// // action = {payload :2 }
