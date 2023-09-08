import { configureStore } from "@reduxjs/toolkit";
import { stockOrderTypeReducer } from "../reducer/StockOrderType-Reducer";
import { stockOrderPriceReducer } from "../reducer/StockOrderPrice-Reducer";
import { expandScreenReducer } from "../reducer/ExpandScreen-Reducer";
import { stockOrderSetReducer } from "../reducer/StockOrderSet-Reducer";
import { companyIdReducer } from "../reducer/CompanyId-Reducer";
import memberInfoReducer from "../reducer/member/memberInfoSlice";

const store = configureStore({
  reducer: {
    stockOrderType: stockOrderTypeReducer,
    stockOrderPrice: stockOrderPriceReducer,
    expandScreen: expandScreenReducer,
    stockOrderSet: stockOrderSetReducer,
    companyId: companyIdReducer,
    memberInfo: memberInfoReducer,
  },
});

export default store;
