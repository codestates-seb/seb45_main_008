import MarketInfo from "./MarketInfoPage";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { DetailStockInformation } from "../../components/stockListComponents/DetailStockInformation";
import { Community } from "./communityPage";
import { useState } from "react";
import { MarketImages, InfoImages, CommunityImages } from "../../components/communityComponents/IconComponent/Icon";
export const TabContainerPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const handleClickActiveTab = (number: number) => {
    setActiveTab(number);
  };

  return (
    <TabContainerStyle className="scroll">
      <style>@import url('https://fonts.googleapis.com/css2?family=Jua&family=Noto+Sans+KR:wght@500&display=swap');</style>

      <div>
        <TabNavArea>
          <Nav to="/" onClick={() => handleClickActiveTab(1)} className={`tab ${activeTab === 1 ? "active-tab" : "inactive-tab"}`}>
            <MarketImages />
            {TabContainerText.marketInfo}
          </Nav>
          <Nav to="/stockitems" onClick={() => handleClickActiveTab(2)} className={`tab ${activeTab === 2 ? "active-tab" : "inactive-tab"}`}>
            <InfoImages />
            {TabContainerText.StockInfo}
          </Nav>
          <Nav to="/community" onClick={() => handleClickActiveTab(3)} className={`tab ${activeTab === 3 ? "active-tab" : "inactive-tab"}`}>
            <CommunityImages />
            {TabContainerText.community}
          </Nav>
        </TabNavArea>
        <Routes>
          <Route path="/" element={<MarketInfo />} />
          <Route path="/stockitems" element={<DetailStockInformation />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </div>
    </TabContainerStyle>
  );
};
const TabContainerText = {
  marketInfo: "시장정보",
  StockInfo: "종목정보",

  community: "커뮤니티",

  myPortfolio: "투자현황",
};
const TabContainerStyle = styled.div`
  width: 26%;
  min-width: 400px;

  border-left: 1px solid black;
  /* overflow: scroll;
  &.scroll::-webkit-scrollbar {
    display: none;
  } */
`;

const TabNavArea = styled.div`
  display: flex;
  width: 100%;
  height: 53px;
  margin-bottom: 10px;
  justify-content: space-around;
  align-items: center;

  padding-top: 10px;
`;

const Nav = styled(Link)`
  &.inactive-tab {
    text-align: center;
    font-size: 14px;
    width: 100%;
    height: 44px;
    font-family: "Noto Sans KR", sans-serif;
    color: #2d4f51;
    border-bottom: 1px solid black;
    margin-top: -20px;
    padding-top: 15px;
  }
  &.active-tab {
    margin-top: -20px;
    padding-top: 15px;
    font-family: "Noto Sans KR", sans-serif;
    text-align: center;
    font-size: 14px;
    height: 44px;
    width: 100%;
    border-bottom: 3px solid#2d4f51;
    color: #2d4f51;
  }
`;
