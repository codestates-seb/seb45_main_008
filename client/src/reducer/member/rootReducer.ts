import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginSlice';
import memberInfoReducer from './memberInfoSlice';

const rootReducer = combineReducers({
  login: loginReducer,
  memberInfo: memberInfoReducer,

});

export type RootState = ReturnType<typeof rootReducer>;