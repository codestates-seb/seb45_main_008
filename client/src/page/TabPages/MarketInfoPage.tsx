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
    <MarketInfoContainer>
      <style>@import url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@500&display=swap');</style>
      <MarketInfoStyle>
        <TabStyle onClick={() => handleTabStyle(1)}>
          <Market onClick={() => handleTabClick("market")} className={`tab ${tabStyle === 1 ? "active-tab" : "inactive-tab"}`}>
            {MarketInfoText.MarketSummary}
          </Market>
        </TabStyle>
        <TabStyle onClick={() => handleTabStyle(2)}>
          <StockList onClick={() => handleTabClick("stockList")} className={`tab ${tabStyle === 2 ? "active-tab" : "inactive-tab"}`}>
            {MarketInfoText.AllStockList}
          </StockList>
        </TabStyle>
      </MarketInfoStyle>
      <TabChangeEffectLine tabStyle={tabStyle} />
      <div>
        {selectedTab === "market" && <MarketSummary />}
        {selectedTab === "stockList" && <MarketStockList />}
      </div>
    </MarketInfoContainer>
  );
};

export default MarketInfo;
const MarketInfoText = {
  MarketSummary: "시장요약",
  AllStockList: "종목랭킹",
};
// **스타일 옮기기

const MarketInfoContainer = styled.div`
  max-height: 500px;
`;

const TabStyle = styled.div`
  cursor: pointer;
`;
//시장정보 탭의 프레임 스타일
const MarketInfoStyle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const Market = styled.div`
  flex: 1 0 0; // 버튼을 동일한 크기로 만듭니다.
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  margin-right: 30px;

  // 활성/비활성 탭 스타일
  &.active-tab {
    transition: all 0.1s;
    color: darkslategray;
    font-family: "Noto Sans KR", sans-serif;
  }
  &.inactive-tab {
    color: lightslategray;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

const StockList = styled.div`
  flex: 1 0 0; // 버튼을 동일한 크기로 만듭니다.
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31px;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  padding: 10px;
  margin-left: 30px;

  // 활성/비활성 탭 스타일
  &.active-tab {
    transition: all 0.1s;
    color: darkslategray;
    font-family: "Noto Sans KR", sans-serif;
  }
  &.inactive-tab {
    color: lightslategray;
    font-family: "Noto Sans KR", sans-serif;
  }
`;

const TabChangeEffectLine = ({ tabStyle }: { tabStyle: number }) => {
  return (
    <DividingContainer tabStyle={tabStyle}>
      <DefaultLine tabStyle={tabStyle}>
        <DivdingLine tabStyle={tabStyle} />
      </DefaultLine>
    </DividingContainer>
  );
};

const DividingContainer = styled.div<{ tabStyle: number }>`
  background-color: darkgray;
  width: 66%;
  margin-left: 17%;
`;

const DefaultLine = styled.div<{ tabStyle: number }>`
  transform: translateX(${(props) => (props.tabStyle === 1 ? "0" : "50%")});
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: 2px;
`;

const DivdingLine = styled.div<{ tabStyle: number }>`
  width: 50%;
  height: 2px;
  background-color: ${(props) => (props.tabStyle === 1 ? " darkslategray" : "lightslategray")};
`;
