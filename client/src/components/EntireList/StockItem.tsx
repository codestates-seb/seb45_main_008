import React, { useState }  from 'react';
import styled from 'styled-components';
import logo from '../../asset/images/StockHolmImage.png';

const StockItem: React.FC<StockItemProps> = ({ company }) => {
  const isPositiveChange = parseFloat(company.stockChangeRate) > 0;
  const priceColor1 = isPositiveChange ? "#ed2926" : "#2679ed";
  const priceColor2 = isPositiveChange ? "#f87369" : "#5a99f8";


  const [showChangePrice, setShowChangePrice] = useState(false); // 상태를 여기로 이동

  return (
    <StockItemWrapper
      onMouseEnter={() => setShowChangePrice(true)}  // StockItemWrapper에 이벤트 리스너 적용
      onMouseLeave={() => setShowChangePrice(false)}
    >
      <Logo src={logo} alt="stock logo" />
      <StockInfo>
        <StockName>{company.korName}</StockName>
        <StockCode>{company.code}</StockCode>
      </StockInfo>
      <StockPriceSection>
        <StockPrice change={priceColor1}>{company.stockPrice}</StockPrice>
        <StockChange
          change={priceColor2}
        >
          {showChangePrice ? `${company.stockChangeAmount}` : `${company.stockChangeRate}%`}
        </StockChange>
      </StockPriceSection>
    </StockItemWrapper>
  );
};

type NewCompanyData = {
  companyId: number;
  code: string;
  korName: string;
  stockPrice: string;
  stockChangeAmount: string;
  stockChangeRate: string;
};

type StockItemProps = {
  company: NewCompanyData;
  setShowChangePrice: React.Dispatch<React.SetStateAction<boolean>>;
  showChangePrice: boolean;
};

const StockItemWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 수평으로 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start; /* 위로 정렬 */
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  background-color: transparent;
  cursor: pointer;
`;

const Logo = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const StockInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-right: 16px;
`;

const StockName = styled.span`
  font-weight: 500;
`;

const StockCode = styled.span`
  color: gray;
  font-weight: 400;
  font-size: 14px;
`;

const StockPriceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: auto; /* 자동으로 왼쪽 여백 추가 */
  margin-right:10px;
`;

const StockPrice = styled.span<{ change: string }>`
  color: ${(props) => props.change};
`;

const StockChange = styled.span<{ change: string }>`
  color: ${(props) => props.change};
  cursor: pointer;
  font-size:14px;
  

`;

export default StockItem;
