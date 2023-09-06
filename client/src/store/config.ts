import { configureStore } from "@reduxjs/toolkit";
import { stockOrderTypeReducer } from "../reducer/StockOrderType-Reducer";
import { stockPriceTypeReducer } from "../reducer/StockPriceType-Reducer";
import { stockOrderPriceReducer } from "../reducer/StockOrderPrice-Reducer";
import { expandScreenReducer } from "../reducer/ExpandScreen-Reducer";
import { stockOrderSetReducer } from "../reducer/StockOrderSet-Reducer";



const store = configureStore({
  reducer: {
    stockOrderType: stockOrderTypeReducer,
    stockPriceType: stockPriceTypeReducer,
    stockOrderPrice: stockOrderPriceReducer,
    expandScreen: expandScreenReducer,
    stockOrderSet: stockOrderSetReducer,

  },
});



export default store;