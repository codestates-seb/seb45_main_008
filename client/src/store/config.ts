import { configureStore } from "@reduxjs/toolkit";
import { stockOrderTypeReducer } from "../reducer/StockOrderType-Reducer";
import { stockOrderPriceReducer } from "../reducer/StockOrderPrice-Reducer";
import { expandScreenReducer } from "../reducer/ExpandScreen-Reducer";
import { stockOrderSetReducer } from "../reducer/StockOrderSet-Reducer";
import { companyIdReducer } from "../reducer/CompanyId-Reducer";
import loginReducer from '../reducer/member/loginSlice';
import cashSlice from '../reducer/cash/cashSlice';
import memberInfoReducer from "../reducer/member/memberInfoSlice";
import { stockOrderVolumeReducer } from "../reducer/StockOrderVolume-Reducer";
import { setDecisionWindowReducer } from "../reducer/SetDecisionWindow-Reducer";


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

  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;