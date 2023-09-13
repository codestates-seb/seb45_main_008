import React, { useState } from 'react';
import styled from 'styled-components';
import Samsung_logo from "../../asset/logos/Samsung_logo.svg"
import LG_logo from "../../asset/logos/LG_logo.svg"
import Sk_logo from "../../asset/logos/Sk_logo.png"
import POSCO_logo from "../../asset/logos/POSCO_logo.svg"
import Menu_icon from "../../asset/images/menu.png"

const WatchList: React.FC<WatchListProps> = ({ currentListType, onChangeListType }) => {

  const [isMenuOpen, setMenuOpen] = useState(false);
  

  const favoriteStocks = [
    { name: "삼성전자", code: "005930", price: "71,000원", change: "+6.13%", changePrice: "+4,100원", logo: Samsung_logo },
    { name: "LG에너지솔루션", code: "373220", price: "522,000원", change: "-4.04%", changePrice: "-22,000원", logo: LG_logo },
    { name: "SK하이닉스", code: "000660", price: "120,000원", change: "-1.48%", changePrice: "-1,800원", logo: Sk_logo },
    { name: "삼성바이오로직스", code: "207940", price: "733,000원", change: "-0.54%", changePrice: "-4,000원", logo: Samsung_logo },
    { name: "POSCO홀딩스", code: "005490", price: "560,000원", change: "-3.28%", changePrice: "-19,000원", logo: POSCO_logo },
    { name: "삼성전자우", code: "005935", price: "56,900원", change: "+5.37%", changePrice: "+2,900원", logo: Samsung_logo },
    { name: "삼성SDI", code: "006400", price: "596,000원", change: "-2.93%", changePrice: "-18,000원", logo: Samsung_logo } 
  ];

  const [showChangePrice, setShowChangePrice] = useState(false);
  
  return (
    <WatchListContainer>
      <Header>
        <Icon 
          src={Menu_icon}
          alt="menu icon"
          onClick={() => setMenuOpen(!isMenuOpen)}
        />
        <HeaderText>{currentListType}</HeaderText>
        {isMenuOpen && (
          <SlideMenu>
            <MenuItem onClick={() => { onChangeListType('관심목록'); setMenuOpen(false); }}>관심목록</MenuItem>
            <MenuItem onClick={() => { onChangeListType('투자목록'); setMenuOpen(false); }}>투자목록</MenuItem>
          </SlideMenu>
        )}
      </Header>
      <Divider1 />
      <AddStockButton onClick={() => { /* 종목 추가 로직 */ }}>종목 추가</AddStockButton>
      <Divider2 />
      {favoriteStocks.map(stock => (
        <StockItem key={stock.name}>
          <Logo src={stock.logo} alt="stock logo"/>
          <StockInfo>
            <StockName>{stock.name}</StockName>
            <StockCode>{stock.code}</StockCode>
          </StockInfo>
          <StockPriceSection>
            <StockPrice change={stock.change}>{stock.price}</StockPrice>
            <StockChange 
                change={stock.change} 
                onMouseEnter={() => setShowChangePrice(true)} 
                onMouseLeave={() => setShowChangePrice(false)}
                >
                {showChangePrice ? stock.changePrice : stock.change}
            </StockChange>
          </StockPriceSection>
        </StockItem>
      ))}
    </WatchListContainer>
  );
};

type WatchListProps = {
  currentListType: "관심목록" | "투자목록";
  onChangeListType: (type: "관심목록" | "투자목록") => void;
};

const getColorByChange = (change: string) => {
  if (change.startsWith('+')) return 'red';
  if (change.startsWith('-')) return 'blue';
  return 'black';
};

const WatchListContainer = styled.div`
  padding: 8px 0px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.img`
  width: 24px; // 너비를 설정합니다. 원하는 크기로 조절 가능합니다.
  height: 24px; // 높이를 설정합니다. 원하는 크기로 조절 가능합니다.
  cursor: pointer;
  margin-right: 10px;
`;

const HeaderText = styled.span`
  font-size: 18px;
`;

const SlideMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 248px;
  background-color: #f7f7f7;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const StockItem = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
  border: none;
  text-align: left;
`;

const Logo = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 12px;
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;
`;

const StockName = styled.span`
  font-weight: bold;
`;

const StockCode = styled.span`
  color: gray;
`;

const StockPriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StockPrice = styled.span.attrs<{ change: string }>(({ change }) => ({
  style: {
    color: getColorByChange(change),
  },
}))``;

const StockChange = styled.span.attrs<{ change: string }>(({ change }) => ({
    style: {
      color: getColorByChange(change),
    },
  }))`
    cursor: pointer;
  `;

const Divider1 = styled.div`
    margin:0px;
    padding:0px;
    width: 100%;
    height: 11px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #2f4f4f;
`;
const Divider2 = styled.div`
    margin:0px;
    padding:0px;
    width: 100%;
    height: 4px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #2f4f4f;
`;

const AddStockButton = styled.button`
  padding: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: left;
  color: black;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export default WatchList;
