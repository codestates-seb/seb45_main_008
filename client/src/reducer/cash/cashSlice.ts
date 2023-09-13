// store/cashSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const cashSlice = createSlice({
    name: 'cash',
    initialState: {
        moneyId: null,
        moneyAmount: null,
    },
    reducers: {
        setMoneyId: (state, action) => {
            state.moneyId = action.payload;
        },
        setMoneyAmount: (state, action) => {
            state.moneyAmount = action.payload;
        },
    },
});

export const { setMoneyId, setMoneyAmount } = cashSlice.actions;
export default cashSlice.reducer;