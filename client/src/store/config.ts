import { configureStore } from "@reduxjs/toolkit";
import { stockOrderTypeReducer } from "../reducer/StockOrderType-Reducer";
import { stockPriceTypeReducer } from "../reducer/StockPriceType-Reducer";
import { stockOrderPriceReducer } from "../reducer/StockOrderPrice-Reducer";

const store = configureStore({
  reducer: {
    stockOrderType: stockOrderTypeReducer,
    stockPriceType: stockPriceTypeReducer,
    stockOrderPrice: stockOrderPriceReducer,
  },
});

export default store;
