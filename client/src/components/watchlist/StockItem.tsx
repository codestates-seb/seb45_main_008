import React from 'react';
import styled from 'styled-components';

// StockItem 컴포넌트는 주식 정보를 나타내는 UI를 구성합니다.
const StockItem: React.FC<StockItemProps> = ({ stock, setShowChangePrice, showChangePrice }) => {
    return (
      <StockItemWrapper>  {/* 전체 아이템을 감싸는 래퍼 */}
        <Logo src={stock.logo} alt="stock logo"/>  {/* 로고 이미지 */}
        <StockInfo>  {/* 주식의 이름과 코드를 담는 섹션 */}
          <StockName>{stock.name}</StockName>  {/* 주식 이름 */}
          <StockCode>{stock.code}</StockCode>  {/* 주식 코드 */}
        </StockInfo>
        <StockPriceSection>  {/* 주식의 가격과 변동률을 담는 섹션 */}
          <StockPrice change={stock.change}>{stock.price}</StockPrice>  {/* 주식 가격 */}
          <StockChange 
            change={stock.change} 
            onMouseEnter={() => setShowChangePrice(true)} 
            onMouseLeave={() => setShowChangePrice(false)}
          >
            {showChangePrice ? stock.changePrice : stock.change}  {/* 변동률 또는 변동 가격 */}
          </StockChange>
        </StockPriceSection>
      </StockItemWrapper>
    );
  };
  
  type Stock = {
    name: string;
    code: string;
    price: string;
    change: string;
    changePrice: string;
    logo: string;
  };
  
  type StockItemProps = {
    stock: Stock;
    showChangePrice: boolean;
    setShowChangePrice: React.Dispatch<React.SetStateAction<boolean>>;
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
