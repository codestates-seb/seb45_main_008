import React, { useState } from 'react';
import styled from 'styled-components';
import Samsung_logo from "../../asset/logos/Samsung_logo.svg"
import Menu_icon from "../../asset/images/menu.png"

const Holdings: React.FC<HoldingsProps> = ({ currentListType, onChangeListType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);


  const holdingsData = [
    { name: "삼성전자", code: "005930", price: "71,000원", change: "+6.13%", 
      profit: "수익", holding: "보유", profitAmount: "+10,000원", purchasePrice: "61,000원",
      rateOfReturn: "+15%", stocksHeld: "100주", logo: Samsung_logo
    },
    // ... (다른 종목들의 더미 데이터도 추가 가능)
  ];

  const [showChangePrice, setShowChangePrice] = useState(false);
  
  return (
    <HoldingsContainer>
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
      <EvaluationProfit>평가 수익금: +5,000,000원</EvaluationProfit> {/* 임의의 평가 수익금 */}
      <Divider2 />
      {holdingsData.map(stock => (
        <>
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
                  {showChangePrice ? stock.profitAmount : stock.change}
              </StockChange>
            </StockPriceSection>
          </StockItem>
          <StockDetails>
              <DetailSection>
              <DetailTitle>{stock.profit}</DetailTitle>
              <DetailTitle>{stock.holding}</DetailTitle>
            </DetailSection>
            <DetailSection>
              <ColoredDetailData value={stock.profitAmount}>{stock.profitAmount}</ColoredDetailData>
              <DetailData>{stock.purchasePrice}</DetailData>
            </DetailSection>
            <DetailSection>
              <ColoredDetailData value={stock.rateOfReturn}>{stock.rateOfReturn}</ColoredDetailData>
              <DetailTitle>{stock.stocksHeld}</DetailTitle>
            </DetailSection>
          </StockDetails>
          <ThickDivider />
        </>
      ))}
    </HoldingsContainer>
  );
};

type HoldingsProps = {
  currentListType: "관심목록" | "투자목록";
  onChangeListType: (type: "관심목록" | "투자목록") => void;
};

const getColorByChange = (change: string) => {
    if (change.startsWith('+')) return 'red';
    if (change.startsWith('-')) return 'blue';
    return 'black';
  };
  
  const HoldingsContainer = styled.div`
    padding: 8px 0px;
  `;
  
  const Header = styled.div`
    padding:0px 16px;
    display: flex;
    align-items: center;
    position: relative;
  `;
  
  const Icon = styled.img`
    width: 24px;
    height: 24px;
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
    height: 4.5px;
    display: flex;
    flex-direction: row;
   border-bottom: 1px solid #2f4f4f;
`;



const EvaluationProfit = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 8px 0;
  text-align: center;
  color: red; // 수익금이 플러스일 경우 초록색으로 표시
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
  font-weight: light;
  font-size : 14px;
`;

const DetailData = styled.span`
  font-size: 14px;  // Setting standardized font size for all data
`;

const getColorByValue = (value: string) => {
  if (value.startsWith('+')) return 'red';
  if (value.startsWith('-')) return 'blue';
  return 'black';
};

const ColoredDetailData = styled.span.attrs<{ value: string }>(({ value }) => ({
  style: {
    color: getColorByValue(value),
  },
}))`
  font-size: 14px;  // Setting standardized font size for all data
`;

const ThickDivider = styled.div`
  height: 3px;
  background-color: #aaa; 
  margin: 8px 0; 
`;

export default Holdings;
