import React, { useState } from 'react';
import styled from 'styled-components';

const Holdings = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [listType, setListType] = useState('투자목록');

  const holdingsData = [
    { name: "삼성전자", code: "005930", price: "71,000원", change: "+6.13%", 
      profit: "수익", holding: "보유", profitAmount: "+10,000원", purchasePrice: "61,000원",
      rateOfReturn: "+15%", stocksHeld: "100주"
    },
    // ... (다른 종목들의 더미 데이터도 추가 가능)
  ];

  const [showChangePrice, setShowChangePrice] = useState(false);
  
  return (
    <HoldingsContainer>
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
      <Divider />
      <EvaluationProfit>평가 수익금: +5,000,000원</EvaluationProfit> {/* 임의의 평가 수익금 */}
      <Divider />
      {holdingsData.map(stock => (
        <>
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
                  {showChangePrice ? stock.profitAmount : stock.change}
              </StockChange>
            </StockPriceSection>
          </StockItem>
          <StockDetails>
            <DetailSection>
              <DetailTitle>{stock.profit}</DetailTitle>
              <DetailData>{stock.profitAmount}</DetailData>
            </DetailSection>
            <DetailSection>
              <DetailTitle>{stock.holding}</DetailTitle>
              <DetailData>{stock.purchasePrice}</DetailData>
            </DetailSection>
            <DetailSection>
              <DetailTitle>{stock.rateOfReturn}</DetailTitle>
              <DetailData>{stock.stocksHeld}</DetailData>
            </DetailSection>
          </StockDetails>
          <ThickDivider />
        </>
      ))}
    </HoldingsContainer>
  );
};

const getColorByChange = (change: string) => {
    if (change.startsWith('+')) return 'red';
    if (change.startsWith('-')) return 'blue';
    return 'black';
  };
  
  const HoldingsContainer = styled.div`
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
  

const EvaluationProfit = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin: 10px 0;
  text-align: center;
  color: green; // 수익금이 플러스일 경우 초록색으로 표시
`;

const StockDetails = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  width: 100%;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DetailTitle = styled.span`
  font-weight: bold;
  margin-bottom: 4px;
`;

const DetailData = styled.span``;

const ThickDivider = styled.div`
  height: 2px;
  background-color: #aaa; 
  margin: 8px 0; 
`;

export default Holdings;
