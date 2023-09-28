import { configureStore } from "@reduxjs/toolkit";
import { stockOrderTypeReducer } from "../reducer/stockOrderType-Reducer";
import { stockOrderPriceReducer } from "../reducer/stockOrderPrice-Reducer";
import { expandScreenReducer } from "../reducer/expandScreen-Reducer";
import { stockOrderSetReducer } from "../reducer/stockOrderSet-Reducer";
import { companyIdReducer } from "../reducer/companyId-Reducer";
import { loginReducer } from "../reducer/member/loginSlice";
import cashSlice from "../reducer/cash/cashSlice";
import memberInfoReducer from "../reducer/member/memberInfoSlice";
import { stockOrderVolumeReducer } from "../reducer/stockOrderVolume-Reducer";
import { setDecisionWindowReducer } from "../reducer/setDecisionWindow-Reducer";
import { compareChartReducer } from "../reducer/compareChart-Reducer";

const store = configureStore({
  reducer: {
    stockOrderType: stockOrderTypeReducer,
    stockOrderPrice: stockOrderPriceReducer,
    expandScreen: expandScreenReducer,
    stockOrderSet: stockOrderSetReducer,
    companyId: companyIdReducer,
    memberInfo: memberInfoReducer,
    login: loginReducer,
    cash: cashSlice,
    stockOrderVolume: stockOrderVolumeReducer,
    decisionWindow: setDecisionWindowReducer,
    compareChart: compareChartReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
