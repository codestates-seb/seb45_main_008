import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    memberId: null,
    isLoggedIn: 1
  },
  reducers: {
    setLoginState: (state, action) => {
      state.memberId = action.payload;
      state.isLoggedIn = 1;
    },
    setLogoutState: (state) => {
      state.memberId = null;
      state.isLoggedIn = 0;
    },
    updateMemberId: (state, action) => {
      state.memberId = action.payload;
    }
  }
});

export const { setLoginState, setLogoutState, updateMemberId } = loginSlice.actions;
export default loginSlice.reducer;