import React, { useState } from "react";
import styled from "styled-components";
import StockSearchComponent from "./StockSearchComponent";
import Header from "./Header";
import StockItem from "./StockItem";
import useCompanyData from "../../hooks/useCompanyData";
import useGetStars from "../../hooks/stars/useGetstars.ts"; // useGetStars 훅의 경로를 지정해주세요.
import { useSelector } from "react-redux";
import { RootState } from "../../store/config.ts"; 

const WatchList: React.FC<WatchListProps> = ({ currentListType, onChangeListType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const loginStatus = useSelector((state: RootState) => state.login);

  const { data: companies, isLoading, isError } = useCompanyData(1, 14);
  const companiesList = companies || [];

  const { data: starredData } = useGetStars();
  const starredCompanyIds = starredData?.map(item => item.companyResponseDto.companyId) || [];

  return (
    <WatchListContainer>
      <Header1Container>
        <Header currentListType={currentListType} onChangeListType={onChangeListType} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
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
          companiesList.filter((company) => starredCompanyIds.includes(company.companyId)).map((company) => <StockItem key={company.companyId} company={company} />)
        ) : (
          <div>로그인이 필요합니다.</div>
        )}
      </StockList>
    </WatchListContainer>
  );
};

type WatchListProps = {
  currentListType: "전체종목" | "관심종목" | "보유종목";
  onChangeListType: (type: "전체종목" | "관심종목" | "보유종목") => void;
};

const WatchListContainer = styled.div`
  width: 247px;
  height: calc(100vh - 53px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header1Container = styled.div`
  height: 48px;
  display: flex;
`;

const Header2Container = styled.div`
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
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export default WatchList;
