import styled from "styled-components";
import React, { useState } from "react";
import MarketSummary from "../../components/MarketComponents/MarketSummary";
import MarketStockList from "../../components/MarketComponents/MarketStockList";
import MarketIssue from "../../components/MarketComponents/MarketIssue";
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

// **스타일 옮기기
//시장정보 탭의 프레임 스타일
const MarketInfoStyle = styled.div`
  display: flex;
  justify-content: space-around;
`;

//시장정보 탭의 시장요약 스타일
const Market = styled.div`
  text-align: center;
`;

//시장정보 탭의 전체주식 스타일
const StockList = styled.div``;
//시장정보 탭의 시장이슈 스타일
const Issue = styled.div``;
