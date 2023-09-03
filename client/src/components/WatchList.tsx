import React, { useState } from 'react';
import styled from 'styled-components';

const WatchList = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [listType, setListType] = useState('관심목록');

  const favoriteStocks = [
    { name: "삼성전자", code: "005930", price: "71,000원", change: "+6.13%", changePrice: "+4,100원" },
    { name: "LG에너지솔루션", code: "373220", price: "522,000원", change: "-4.04%", changePrice: "-22,000원" },
    { name: "SK하이닉스", code: "000660", price: "120,000원", change: "-1.48%", changePrice: "-1,800원" },
    { name: "삼성바이오로직스", code: "207940", price: "733,000원", change: "-0.54%", changePrice: "-4,000원" },
    { name: "POSCO홀딩스", code: "005490", price: "560,000원", change: "-3.28%", changePrice: "-19,000원" },
    { name: "삼성전자우", code: "005935", price: "56,900원", change: "+5.37%", changePrice: "+2,900원" },
    { name: "삼성SDI", code: "006400", price: "596,000원", change: "-2.93%", changePrice: "-18,000원" }
  ];

  const [showChangePrice, setShowChangePrice] = useState(false);
  
  

  return (
    <WatchListContainer>
      <Header>
        <Icon onClick={() => setMenuOpen(!isMenuOpen)}>📄</Icon>
        <HeaderText>{listType}</HeaderText>
        {isMenuOpen && (
          <SlideMenu>
            <MenuItem onClick={() => { setListType('관심목록'); setMenuOpen(false); }}>관심목록</MenuItem>
            <MenuItem onClick={() => { setListType('투자목록'); setMenuOpen(false); }}>투자목록</MenuItem>
          </SlideMenu>
        )}
      </Header>
      <Divider /> {/* 회색 가로줄 추가 */}
      <AddStockButton onClick={() => { /* 종목 추가 로직 */ }}>종목 추가</AddStockButton>
      <Divider /> {/* 회색 가로줄 추가 */}
      {favoriteStocks.map(stock => (
        <StockItem key={stock.name}>
          <Logo src="path_to_logo_image.jpg" alt="stock logo"/>
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

const getColorByChange = (change: string) => {
  if (change.startsWith('+')) return 'red';
  if (change.startsWith('-')) return 'blue';
  return 'black';
};

const WatchListContainer = styled.div`
  padding: 16px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.span`
  font-size: 24px;
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
  align-items: flex-start; // 시작 위치 정렬 추가
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
  align-items: flex-start; // 시작 위치 정렬 추가
  margin-right: 16px;  // 간격 추가
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
  align-items: flex-start; // 시작 위치 정렬 추가
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
    cursor: pointer; // 마우스 포인터 변경 추가
  `;

const Divider = styled.div`
height: 1px;
background-color: #aaa; // 회색으로 설정
margin: 8px 0; // 상하 여백 추가
`;

const AddStockButton = styled.button`
padding: 10px 20px; // 크기 약간 키움
border: none;
background-color: transparent;
cursor: pointer;
text-align: left;
color: black; // 검정색으로 변경
&:hover {
  background-color: #e0e0e0;
}
`;

export default WatchList;

