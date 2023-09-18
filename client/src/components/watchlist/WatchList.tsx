import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import StockSearchComponent from './StockSearchComponent';
import Header from './Header';
import StockItem from './StockItem';
import useCompanyData from '../../hooks/useCompanyData';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/config.ts';  // Redux store의 RootState를 import해야 합니다.

const WatchList: React.FC<WatchListProps> = ({ currentListType, onChangeListType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const loginStatus = useSelector((state: RootState) => state.login);


  // useCompanyData 훅 사용하여 데이터 가져오기
  const { data: companies, isLoading, isError } = useCompanyData(1, 14);

  // 'companies'가 'undefined'인 경우를 처리하기 위해 빈 배열로 초기화
  const companiesList = companies || [];


    // 이미 검색된 회사 ID들을 저장하는 스택 형태의 상태
  const [searchedCompanyIds, setSearchedCompanyIds] = useState<number[]>([]);

  // Redux store에서 선택된 회사 ID 가져오기
  const selectedCompanyId = useSelector((state: RootState) => state.companyId);

  // 새로운 회사 ID가 검색될 때마다 스택에 추가
  useEffect(() => {
    if (selectedCompanyId !== -1 && !searchedCompanyIds.includes(selectedCompanyId)) {
      setSearchedCompanyIds(prevIds => [...prevIds, selectedCompanyId]);
    }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompanyId]);

  //
  useEffect(() => {
    localStorage.setItem('searchedCompanyIds', JSON.stringify(searchedCompanyIds));
  }, [searchedCompanyIds]);

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
        <StockSearchComponent />
      </Header2Container>
      <Divider />
      <StockList>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Error fetching data</div>
        ) : loginStatus === 1 ? (
        companiesList
        .filter(company => searchedCompanyIds.includes(company.companyId))
        .map((company) => (
            <StockItem key={company.companyId} company={company} />
          ))
        ) : (
        <div>로그인이 필요합니다.</div>
  )   }
    </StockList>

    </WatchListContainer>
  );
};

// Props와 상태에 대한 타입 정의
type WatchListProps = {
  currentListType: '전체종목' | '관심종목' | '보유종목';
  onChangeListType: (type: '전체종목' | '관심종목' | '보유종목') => void;
};

// WatchList 컴포넌트에 대한 스타일드 컴포넌트 정의
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
`;

const Divider = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #2f4f4f;
`;

const StockList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default WatchList;