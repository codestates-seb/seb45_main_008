import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeCompanyId } from "../../reducer/CompanyId-Reducer";
import useGetCompanyList from "../../hooks/useGetCompanyList";


const stockSearch = "종목 검색";
const search = "검색";
const noExistCompany = "noExistCompany";
const existCompany = "existCompany";

const StockSearchComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { companyList } = useGetCompanyList();
  const [searchWord, setSearchWord] = useState("");

  const handleChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSearchCompany = () => {
    let searchResult: string = noExistCompany;
    let foundCompanyId: number | null = null;

    companyList.forEach((company: CompanyProps) => {
      if (company.korName === searchWord) {
        searchResult = existCompany;
        dispatch(changeCompanyId(company.companyId));
        foundCompanyId = company.companyId;  // companyId 저장
      }
    });
    if (searchResult === existCompany && foundCompanyId !== null) {
      dispatch(changeCompanyId(foundCompanyId));
    } else {
      dispatch(changeCompanyId(-1));
    }



    if (searchResult === noExistCompany) {
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
        placeholder={stockSearch}
      />
      <StyledSearchButton onClick={handleSearchCompany}>{search}</StyledSearchButton>
    </SearchContainer>
  );
};

export default StockSearchComponent;

interface CompanyProps {
    companyId: number;
    code: string;
    korName: string;
    stockAsBiResponseDto: null;
    stockInfResponseDto: null;
}

// 스타일 정의

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 0.7;
  margin: 1px 10px;
`;

const StyledSearchInput = styled.input.attrs({
  type: "text",
  placeholder: "검색...",
})`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  flex: 1;
  margin-left:8px;
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
