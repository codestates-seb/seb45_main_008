import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import StockItem from './StockItem';
import useGetStockHolds from '../../hooks/useGetStockholds';
import { StockItemProps } from './StockItem';
import useCompanyData from '../../hooks/useCompanyData';

const HoldingList: React.FC<WatchListProps> = ({ currentListType, onChangeListType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showChangePrice, setShowChangePrice] = useState(false);

  const { stockHolds, stockHoldsLoading: isLoading, stockHoldsError: isError } = useGetStockHolds();
  const { data: companyData, isLoading: isCompanyDataLoading, isError: isCompanyDataError } = useCompanyData(1, 14);

  // 모든 stockReturn의 합을 계산합니다.
  let totalEvaluationProfit = 0;

  if (stockHolds) {
    totalEvaluationProfit = stockHolds.reduce((sum:number, stockHold: StockItemProps['stockData']) => sum + stockHold.stockReturn, 0);
  }

  return (
    <WatchListContainer>
      <Header1Container>
        <Header
          currentListType={currentListType}
          onChangeListType={onChangeListType}
          isMenuOpen={isMenuOpen}
          setMenuOpen={setMenuOpen}
        />
      </Header1Container>
      <Divider />
      <Header2Container>
      <EvaluationProfit profit={totalEvaluationProfit}>
         평가 수익금: {totalEvaluationProfit.toLocaleString()}원
      </EvaluationProfit>
      </Header2Container>
      <Divider />
      <StockList>
        {isLoading || isCompanyDataLoading ? (
          <div>Loading...</div>
        ) : isError || isCompanyDataError ? (
          <div>Error fetching data</div>
        ) : (
          stockHolds.map((stockHold: StockItemProps['stockData']) => {
            const matchedCompany = companyData ? companyData.find(company => company.companyId === stockHold.companyId) : undefined;
            
            return matchedCompany ? (
              <StockItem
                key={stockHold.companyId}
                stockData={stockHold}
                companyData={matchedCompany}
                setShowChangePrice={setShowChangePrice}
                showChangePrice={showChangePrice}
              />
            ) : null;
          })
        )}
      </StockList>
    </WatchListContainer>
  );
};

export default HoldingList;

type WatchListProps = {
  currentListType: '전체종목' | '관심종목' | '보유종목';
  onChangeListType: (type: '전체종목' | '관심종목' | '보유종목') => void;

};

const WatchListContainer = styled.div`
  height: calc(100vh - 53px); 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header1Container =styled.div`
  height: 48px;
  display: flex;
`;

const Header2Container =styled.div`
  height: 43.5px;
  display: flex;
  justify-content:center;
  align-items: center;
`;

const Divider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #2f4f4f;
`;
const EvaluationProfit = styled.div<{ profit: number }>`
  font-size: 16px;
  font-weight: bold;
  margin-left: 20px;
  text-align: center;
  color: ${props => 
    props.profit === 0 ? '#000' :
    props.profit > 0 ? '#e22926' :
    '#2679ed'
  };
`;

const StockList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */

  &::-webkit-scrollbar {
    display: none;
  }
`;
