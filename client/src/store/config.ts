import { configureStore } from "@reduxjs/toolkit";
import { stockOrderTypeReducer } from "../reducer/StockOrderType-Reducer";

const store = configureStore({
  reducer: {
    stockOrderType: stockOrderTypeReducer,
  },
});

export default store;
