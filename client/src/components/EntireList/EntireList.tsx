import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import StockItem from './StockItem';
import useCompanyData from '../../hooks/useCompanyData';
import { useSelector } from 'react-redux'; 
import { RootState } from '../../store/config'; 

const EntireList: React.FC<EntireListProps> = ({ currentListType, onChangeListType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showChangePrice, setShowChangePrice] = useState(false);

  // useCompanyData 훅 사용하여 데이터 가져오기
  const { data: companies, isLoading, isError } = useCompanyData(1, 14);

  // 'companies'가 'undefined'인 경우를 처리하기 위해 빈 배열로 초기화
  const companiesList = companies || [];

    // 현금 보유량 가져오기
  // 현금 보유량 가져오기: Redux store에서 직접 가져옵니다.
  const holdingsAmount = useSelector((state: RootState) => state.cash.money) || "0";


  return (
    <WatchListContainer>
      <Header
        currentListType={currentListType}
        onChangeListType={onChangeListType}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      />
      <Divider1 />
      <HoldingsAmount>현금 보유량: {holdingsAmount}원</HoldingsAmount> {/* 현금 보유량 표시 */}
      <Divider2 />
      <StockList>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching data</div>
        ) : (
          companiesList.map((company) => (
            <StockItem
              key={company.companyId}
              company={company}
              setShowChangePrice={setShowChangePrice}
              showChangePrice={showChangePrice}
            />
          ))
        )}
      </StockList>
    </WatchListContainer>
  );
};

export default EntireList;

// Props와 상태에 대한 타입 정의
type EntireListProps = {
  currentListType: '전체종목' | '관심종목' | '보유종목';
  onChangeListType: (type: '전체종목' | '관심종목' | '보유종목') => void;
};

// WatchList 컴포넌트에 대한 스타일드 컴포넌트 정의
const WatchListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Divider1 = styled.div`
margin:0px;
padding:0px;
width: 100%;
height: 10px;
display: flex;
flex-direction: row;
border-bottom: 1px solid #2f4f4f;
`;

const HoldingsAmount = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin: 8px 12px ;
  text-align: center;
  color: darkslategray // 현금 보유량을 파란색으로 표시
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

const StockList = styled.div`
  width: 100%;
  max-height: 740px; /* 스크롤이 발생할 최대 높이를 지정하세요 */
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */
`;


