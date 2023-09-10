import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    memberId: null,
    isLoggedOut: 1
  },
  reducers: {
    setLoginState: (state, action) => {
      state.memberId = action.payload;
      state.isLoggedOut = 0;
    },
    setLogoutState: (state) => {
      state.memberId = null;
      state.isLoggedOut = 1;
    },
    updateMemberId: (state, action) => {
      state.memberId = action.payload;
    }
  }
});

export const { setLoginState, setLogoutState, updateMemberId } = loginSlice.actions;
export default loginSlice.reducer;