// loginSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedOut: 0, // 0: 로그아웃, 1: 로그인
  memberId: null  // 로그인된 사용자의 ID
};

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginState: (state, action) => {
      state.isLoggedOut = 1;
      state.memberId = action.payload;
    },
    setLogoutState: (state) => {
      state.isLoggedOut = 0;
      state.memberId = null;
    }
  }
});

export const { setLoginState, setLogoutState } = loginSlice.actions;
export default loginSlice.reducer;