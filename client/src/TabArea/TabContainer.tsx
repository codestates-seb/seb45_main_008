import { TabContainerStyle } from "../TabStyle/TabContainerStyle";
import { MarketInfo } from "./MarketInfo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Nav, TabNavArea } from "./TabNavArea";
import { StockItems } from "./StockItems";
import { Indicator } from "./Indicator";
import { MarketIssue } from "./MarketIssue";

export const TabContainer = () => {
  return (
    <BrowserRouter>
      <TabContainerStyle>
        <Routes>
          <Route path="/" element={<MarketInfo />} />
          <Route path="/stockitems" element={<StockItems />} />
          <Route path="/indicator" element={<Indicator />} />
          <Route path="/marketissue" element={<MarketIssue />} />
        </Routes>
        <TabNavArea>
          <Nav to="/">시장정보</Nav>
          <Nav to="/stockitems">전체종목</Nav>
          <Nav to="/indicator">시장지표</Nav>
          <Nav to="/marketissue">시장이슈</Nav>
        </TabNavArea>
        <MarketInfo />
      </TabContainerStyle>
    </BrowserRouter>
  );
};
