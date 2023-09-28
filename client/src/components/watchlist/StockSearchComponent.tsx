import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { changeCompanyId } from "../../reducer/companyId-Reducer";
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

    if (searchWord === "") {
      return;
    }

    const translateToKorean = (word: string) => {
      const translations: { [key: string]: string } = {
        samsung: "삼성전자",
        eco: "에코프로",
        ecopro: "에코프로",
        ecoprobm: "에코프로비엠",
        ecoprob: "에코프로비엠",
        posco: "POSCO홀딩스",
        kia: "기아",
        hyundai: "현대차",
        hyundaicar: "현대차",
        dy: "디와이",
        kuckoo: "쿠쿠홀딩스",
        kuckooholdings: "쿠쿠홀딩스",
        hansemk: "한세엠케이",
        hanse: "한세엠케이",
        lgchemical: "LG화학",
        lgelectronic: "LG화학",
        lgchem: "LG화학",
        lgelec: "LG전자",
        celltrion: "셀트리온",
        cell: "셀트리온",
        kakaobank: "카카오뱅크",
        kakao: "카카오뱅크",
        // 추가적인 회사 이름을 여기에 추가할 수 있습니다.
      };
      return translations[word.toLowerCase()] || word;
    };

    const translateToEnglish = (word: string) => {
      const translations: { [key: string]: string } = {
        엘지화학: "LG화학",
        엘지전자: "LG전자",
        엘지: "LG",
        포스코: "POSCO",
        케이지: "KG",
      };
      return translations[word] || word;
    };

    let translatedWord = translateToKorean(searchWord);
    translatedWord = translateToEnglish(translatedWord);

    companyList.forEach((company: CompanyProps) => {
      if (company.korName.includes(translatedWord)) {
        searchResult = existCompany;
        dispatch(changeCompanyId(company.companyId));
      }
    });

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
      <StyledSearchInput value={searchWord} onChange={handleChangeSearchWord} onKeyDown={handlePressEnterToSearch} placeholder={stockSearch} />
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
  margin-left: 8px;
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
