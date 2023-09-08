import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";
import { StateProps } from "../../models/stateProps";
import { changeCompanyId } from "../../reducer/CompanyId-Reducer";

import useGetStockData from "../../hooks/useGetStockData";
import useGetStockChart from "../../hooks/useGetStockChart";

// 🔴 회사 목록 데이터 불러오는 로직
import useGetCompanyList from "../../hooks/useGetCompanyList";

const loadingText = "로딩 중 입니다...";
const errorText = "화면을 불러올 수 없습니다";

//🔴 테스트
import { useState } from "react";

const StockChart = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const dispatch = useDispatch();

  const { stockPriceLoading, stockPriceError } = useGetStockData(companyId);
  const { options, chartStyle } = useGetStockChart(companyId);

  // 🔴 차트 변환 테스트

  // 🔴 1) 검색 이벤트
  const { companyList, compnayListLoading, companyListError } = useGetCompanyList();
  const [searchWord, setSearchWord] = useState("");

  if (compnayListLoading) {
    return <p>회사정보 불러오는 중</p>;
  }

  if (companyListError) {
    return <p>에러 발생</p>;
  }

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

  const handlePressEmnterToSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter" && e.nativeEvent.isComposing === false) {
      handleSearchCompany();
      setSearchWord("");
    }
  };

  // 🔴 2) 클릭 이벤트
  const handleKospi = () => {
    dispatch(changeCompanyId(0));
  };

  const handlePlus = () => {
    dispatch(changeCompanyId(companyId + 1));
  };

  const handleStock1 = () => {
    dispatch(changeCompanyId(1));
  };

  const handleStock10 = () => {
    dispatch(changeCompanyId(10));
  };
  //

  if (stockPriceLoading) {
    return <LoadingContainer>{loadingText}</LoadingContainer>;
  }

  if (stockPriceError) {
    return <ErrorContainer>{errorText}</ErrorContainer>;
  }

  return (
    <Container>
      {/* 🔴 차트 변경 이벤트 테스트 */}
      <label>
        종목 검색
        <input onChange={handleChangeSearchWord} onKeyDown={handlePressEmnterToSearch} />
        <button onClick={handleSearchCompany}>검색</button>
      </label>
      <button onClick={handleKospi}>코스피 버튼</button>
      <button onClick={handlePlus}>CompanyId +1</button>
      <button onClick={handleStock1}>1번 주식 버튼</button>
      <button onClick={handleStock10}>10번 주식 버튼</button>
      {/* 🔴 차트 변경 이벤트 테스트 */}
      <EChartsReact option={options} style={chartStyle} />
    </Container>
  );
};

export default StockChart;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: 500;
  color: #999999;
`;

const ErrorContainer = styled(LoadingContainer)``;

//🔴 테스트
// type 선언
interface CompanyProps {
  companyId: number;
  code: string;
  korName: string;
  stockAsBiResponseDto: null;
  stockInfResponseDto: null;
}
