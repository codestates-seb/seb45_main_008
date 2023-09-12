import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    memberId: 0,
    isLoggedIn: 1
  },
  reducers: {
    setLoginState: (state, action) => {
      state.memberId = action.payload;
      state.isLoggedIn = 1;
    },
    setLogoutState: (state) => {
      state.memberId = 0;
      state.isLoggedIn = 0;
    },

  }
});

export const { setLoginState, setLogoutState} = loginSlice.actions;
export default loginSlice.reducer;