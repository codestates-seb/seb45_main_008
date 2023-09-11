import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeCompanyId } from "../../reducer/CompanyId-Reducer";
import useGetCompanyList from "../../hooks/useGetCompanyList";

interface CompanyProps {
  companyId: number;
  code: string;
  korName: string;
  stockAsBiResponseDto: null;
  stockInfResponseDto: null;
}

const StockSearchComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { companyList } = useGetCompanyList();
  const [searchWord, setSearchWord] = useState("");

  const handleChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSearchCompany = () => {
    let searchResult: string = "noExistCompany";

    companyList.forEach((company: CompanyProps) => {
      if (company.korName === searchWord) {
        searchResult = "ExistCompany";
        dispatch(changeCompanyId(company.companyId));
      }
    });

    if (searchResult === "noExistCompany") {
      dispatch(changeCompanyId(-1));
    }
  };

  const handlePressEnterToSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
      handleSearchCompany();
      setSearchWord("");
    }
  };

  return (
    <SearchContainer>
      <StyledSearchInput 
        value={searchWord}
        onChange={handleChangeSearchWord} 
        onKeyDown={handlePressEnterToSearch} 
        placeholder="종목 검색"
      />
      <StyledSearchButton onClick={handleSearchCompany}>검색</StyledSearchButton>
    </SearchContainer>
  );
};

export default StockSearchComponent;

// 스타일 정의

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 0.7;  // 여기에 추가
`;

const StyledSearchInput = styled.input.attrs({
  type: "text",
  placeholder: "검색...",
})`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
`;

const StyledSearchButton = styled.button`
  background-color: #fff;
  color: #2f4f4f;
  border: 1px solid #2f4f4f;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f2f2f2;
  }
  margin-left: 0.5rem;
`;
