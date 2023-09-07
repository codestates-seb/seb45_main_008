import styled from "styled-components";
import React, { useState } from "react";
import MarketSummary from "../../components/MarketComponents/index";
import MarketStockList from "../../components/MarketComponents/MarketStockList";

interface Props {}
const MarketInfo: React.FC<Props> = () => {
  const [selectedTab, setSelectedTab] = useState<string>("market");
  const [tabStyle, setTabStyle] = useState<number>(1);
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
  };
  const handleTabStyle = (number: number) => {
    setTabStyle(number);
  };
  return (
    <div>
      <style>
        @import
        url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@500&display=swap');
      </style>

      <MarketInfoStyle>
        <TabStyle
          onClick={() => handleTabStyle(1)}
          className={`tab ${tabStyle === 1 ? "active-tab" : "inactive-tab"}`}
        >
          <Market onClick={() => handleTabClick("market")}>
            {MarketInfoText.MarketSummary}
          </Market>
        </TabStyle>
        <TabStyle
          onClick={() => handleTabStyle(2)}
          className={`tab ${tabStyle === 2 ? "active-tab" : "inactive-tab"}`}
        >
          <StockList onClick={() => handleTabClick("stockList")}>
            {MarketInfoText.AllStockList}
          </StockList>
        </TabStyle>
      </MarketInfoStyle>
      <div>
        {selectedTab === "market" && <MarketSummary />}
        {selectedTab === "stockList" && <MarketStockList />}
      </div>
    </div>
  );
};

export default MarketInfo;
const MarketInfoText = {
  MarketSummary: "시장요약",
  AllStockList: "전체종목",
};
// **스타일 옮기기

const TabStyle = styled.div`
  cursor: pointer;

  &.active-tab {
    transition: all 0.4s;
    border: 1px solid#2d4f51;
    background-color: #2d4f51;
    padding: 10px 30px;
    font-size: 14px;
    border-radius: 60px 60px;
    color: #fff;
    font-family: "Noto Sans KR", sans-serif;
  }
  &.inactive-tab {
    border: 1px solid#2d4f51;
    padding: 10px;
    color: #2d4f51;
    font-size: 14px;
    border-radius: 60px 60px;
    font-family: "Noto Sans KR", sans-serif;
  }
`;
//시장정보 탭의 프레임 스타일
const MarketInfoStyle = styled.div`
  display: flex;
  justify-content: space-around;
`;

//시장정보 탭의 시장요약 스타일
const Market = styled.div`
  text-align: center;
  cursor: pointer;
`;

//시장정보 탭의 전체주식 스타일
const StockList = styled.div`
  cursor: pointer;
`;
//시장정보 탭의 시장이슈 스타일
