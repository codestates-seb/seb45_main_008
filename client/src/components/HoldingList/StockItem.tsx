import React,{ useState } from 'react';
import styled from 'styled-components';
import logo from '../../asset/images/StockHolmImage.png';

export type StockItemProps = {
  stockData: {
    stockHoldId: number;
    memberId: number;
    companyId: number;
    companyKorName: string;
    stockCount: number;
    totalPrice: number;
    percentage: number;
    stockReturn: number;
    reserveSellStockCount: number;
  };
  companyData?: {
    companyId: number;
    code: string;
    korName: string;
    stockPrice: string;
    stockChangeAmount: string;
    stockChangeRate: string;
  };
  setShowChangePrice: (value: boolean) => void;
  showChangePrice: boolean;
};



const StockItem: React.FC<StockItemProps> = ({ companyData, stockData }) => {
  const [showChangePrice, setShowChangePrice] = useState(false);  // local state
  const {  stockCount, reserveSellStockCount, totalPrice, percentage, stockReturn } = stockData;
  const totalStocksHeld = stockCount + reserveSellStockCount;
  const company = companyData ? companyData : undefined;

  const { 
    code = '', 
    korName = '', 
    stockPrice='',
    stockChangeAmount = '', 
    stockChangeRate = '' 
  } = company || {};
  
  // Format percentage to two decimal places
  const formattedPercentage = parseFloat(percentage.toFixed(2));


  return (
    <>
      <ItemContainer         onMouseEnter={() => setShowChangePrice(true)}  // Mouse event handlers
        onMouseLeave={() => setShowChangePrice(false)}>
        
        <Logo src={logo} alt="stock logo" />
        <StockInfo>
          <StockName>{korName}</StockName>
          <StockCode>{code}</StockCode>
        </StockInfo>
        <StockPriceSection>
          <StockPrice change={`${stockChangeRate}%`}>{stockPrice.toLocaleString()} 원</StockPrice>
          <StockChange 
              change={`${stockChangeRate}%`} 
              onMouseEnter={() => setShowChangePrice(true)} 
              onMouseLeave={() => setShowChangePrice(false)}
              >
              {showChangePrice ? stockChangeAmount.toLocaleString() : `${stockChangeRate}%`}
          </StockChange>
        </StockPriceSection>
      </ItemContainer>
      <StockDetails>
        <DetailSection>
          <DetailTitle>수익</DetailTitle>
          <DetailTitle>보유</DetailTitle>
        </DetailSection>
        <DetailSection>
          <ColoredDetailData value={stockReturn.toString()}>{stockReturn.toLocaleString()} 원</ColoredDetailData>
          <DetailData>{totalPrice.toLocaleString()} 원</DetailData>
        </DetailSection>
        <DetailSection>
          <ColoredDetailData value={`${formattedPercentage}%`}>{formattedPercentage}%</ColoredDetailData>
          <DetailTitle>{totalStocksHeld}주</DetailTitle>
        </DetailSection>
      </StockDetails>
      <ThickDivider />
    </>
  );
};

export default StockItem;

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0; // Holdings에서의 스타일 추가
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

const getColorByChange = (change: string) => {
  if (change.startsWith('')) return 'red';
  if (change.startsWith('-')) return 'blue';
  return 'black';
};

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
  if (value.startsWith('')) return '#ed2926';
  if (value.startsWith('-')) return '#2679ed';
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

