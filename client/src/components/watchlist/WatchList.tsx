import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import StockItem from './StockItem';
import useCompanyData from '../../hooks/useCompanyData';

const WatchList: React.FC<WatchListProps> = ({ currentListType, onChangeListType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showChangePrice, setShowChangePrice] = useState(false);

  // useCompanyData 훅 사용하여 데이터 가져오기
  const { data: companies, isLoading, isError } = useCompanyData(1, 14);

  // 'companies'가 'undefined'인 경우를 처리하기 위해 빈 배열로 초기화
  const companiesList = companies || [];

  return (
    <WatchListContainer>
      <Header
        currentListType={currentListType}
        onChangeListType={onChangeListType}
        isMenuOpen={isMenuOpen}
        setMenuOpen={setMenuOpen}
      />
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

// Props와 상태에 대한 타입 정의
type WatchListProps = {
  currentListType: '관심목록' | '투자목록';
  onChangeListType: (type: '관심목록' | '투자목록') => void;
};

// WatchList 컴포넌트에 대한 스타일드 컴포넌트 정의
const WatchListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StockList = styled.div`
  width: 100%;
  max-height: 400px; /* 스크롤이 발생할 최대 높이를 지정하세요 */
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */
`;

export default WatchList;
