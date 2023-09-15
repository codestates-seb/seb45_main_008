import React from 'react';
import styled from 'styled-components';
import logo from '../../asset/logos/SK_logo.png'



// StockItem 컴포넌트는 주식 정보를 나타내는 UI를 구성합니다.
const StockItem: React.FC<StockItemProps> = ({ company, setShowChangePrice, showChangePrice }) => {
    return (
      <StockItemWrapper>  {/* 전체 아이템을 감싸는 래퍼 */}
        <Logo src={logo} alt="stock logo"/>  {/* 로고 이미지 */}
        <StockInfo>  {/* 주식의 이름과 코드를 담는 섹션 */}
          <StockName>{company.korName}</StockName>  {/* 주식 이름 */}
          <StockCode>{company.code}</StockCode>  {/* 주식 코드 */}
        </StockInfo>
        <StockPriceSection>  {/* 주식의 가격과 변동률을 담는 섹션 */}
        <StockPrice change={company.stockChangeRate}>{company.stockPrice}</StockPrice>
            <StockChange 
            change={company.stockChangeRate}
            onMouseEnter={() => setShowChangePrice(true)} 
            onMouseLeave={() => setShowChangePrice(false)}
        >
            {showChangePrice ? company.stockChangeAmount : company.stockChangeRate} {/* 변동률 또는 변동 가격 */}
          </StockChange>
        </StockPriceSection>
      </StockItemWrapper>
    );
  };
  
  
  // 새로운 주식 데이터 형태
  type NewCompanyData = {
    companyId: number;
    code: string;
    korName: string;
    stockPrice: string; // 현재가
    stockChangeAmount: string; // 변동량
    stockChangeRate: string; // 변동률
  };
  
  // StockItem 컴포넌트에서 사용할 주식 데이터 형태
  type StockItemProps = {
    company: NewCompanyData;
    setShowChangePrice: React.Dispatch<React.SetStateAction<boolean>>;
    showChangePrice: boolean;
  };
  

const StockItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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
`;

const StockPrice = styled.span<{ change: string }>`
  color: ${props => props.change.startsWith('+') ? 'red' : 'blue'};
`;

const StockChange = styled.span<{ change: string }>`
  color: ${props => props.change.startsWith('+') ? 'red' : 'blue'};
  cursor: pointer;
`;

export default StockItem;
