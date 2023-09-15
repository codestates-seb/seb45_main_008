import React from 'react';
import styled from 'styled-components';
import logo from '../../asset/logos/SK_logo.png';

const StockItem: React.FC<StockItemProps> = ({ company, setShowChangePrice, showChangePrice }) => {
  const isPositiveChange = parseFloat(company.stockChangeRate) > 0;
  const priceColor = isPositiveChange ? 'red' : 'blue';

  return (
    <StockItemWrapper>
      <Logo src={logo} alt="stock logo" />
      <StockInfo>
        <StockName>{company.korName}</StockName>
        <StockCode>{company.code}</StockCode>
      </StockInfo>
      <StockPriceSection>
        <StockPrice change={priceColor}>{company.stockPrice}</StockPrice>
        <StockChange
          change={priceColor}
          onMouseEnter={() => setShowChangePrice(true)}
          onMouseLeave={() => setShowChangePrice(false)}
        >
          {showChangePrice ? `${company.stockChangeAmount}%` : `${company.stockChangeRate}%`}
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
  margin-left: auto; /* 자동으로 왼쪽 여백 추가 */
`;

const StockPrice = styled.span<{ change: string }>`
  color: ${(props) => props.change};
`;

const StockChange = styled.span<{ change: string }>`
  color: ${(props) => props.change};
  cursor: pointer;
`;

export default StockItem;
