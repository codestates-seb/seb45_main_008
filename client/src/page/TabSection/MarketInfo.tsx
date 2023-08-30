import {
  MarketInfoStyle,
  Market,
  Issue,
  StockList,
} from "../TabStyle/MarketInfoStyle";
import React, { useState } from "react";
import MarketSummary from "../TabComponents/MarketSummary";
import MarketStockList from "../TabComponents/MarketStockList";
import MarketIssue from "../TabComponents/MarketIssue";
interface Props {}
const MarketInfo: React.FC<Props> = () => {
  const [selectedTab, setSelectedTab] = useState<string>("market");
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    console.log("click");
  };
  return (
    <div>
      <MarketInfoStyle>
        <Market onClick={() => handleTabClick("market")}>시장요약</Market>
        <StockList onClick={() => handleTabClick("stockList")}>
          전체종목
        </StockList>
        <Issue onClick={() => handleTabClick("issues")}>시장이슈</Issue>
      </MarketInfoStyle>
      <div>
        {selectedTab === "market" && <MarketSummary />}
        {selectedTab === "stockList" && <MarketStockList />}
        {selectedTab === "issues" && <MarketIssue />}
      </div>
    </div>
  );
};

export default MarketInfo;
