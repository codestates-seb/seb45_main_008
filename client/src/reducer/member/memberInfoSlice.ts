// memberInfoSlice.ts

import { createSlice, PayloadAction} from '@reduxjs/toolkit';

interface MemberInfo {

  email: string;
  name: string;
  createdAt: string;
}

interface MemberInfoState {
  memberInfo: MemberInfo | null;
  emailForVerification: string | null;  // 이메일 상태 추가
}

const initialState: MemberInfoState = {
  memberInfo: null,
  emailForVerification: null,  // 초기값 설정
};

const memberInfoSlice = createSlice({
    name: 'memberInfo',
    initialState,
    reducers: {
        setMemberInfo: (state, action: PayloadAction<MemberInfo>) => {
            state.memberInfo = action.payload;
        },
        setEmailForVerification: (state, action: PayloadAction<string>) => {
            state.emailForVerification = action.payload;
        },
    },

    
});

export const { setMemberInfo, setEmailForVerification } = memberInfoSlice.actions;

export default memberInfoSlice.reducer;