import { useDispatch } from "react-redux";
import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";
import { changeCompanyId } from "../../reducer/CompanyId-Reducer";

import useGetKospiChart from "../../hooks/useGetKospiChart";

// 🔴 회사 목록 데이터 불러오는 로직
import useGetCompanyList from "../../hooks/useGetCompanyList";

const loadingText = "로딩 중 입니다...";
const errorText = "화면을 불러올 수 없습니다";

//🔴 테스트
import { useEffect, useState } from "react";

const KospiChart = () => {
  const dispatch = useDispatch();

  const { kospiLoading, kospiError, options, chartStyle } = useGetKospiChart();

  // 🔴 차트 변환 테스트

  // 🔴 1) 검색 이벤트
  const { companyList } = useGetCompanyList();
  const [companyLists, setCompanyLists] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  // 회사 목록 불러오면 -> companyList 상태에 할당
  useEffect(() => {
    setCompanyLists(companyList);
  }, [companyList]);

  const handleChangeSearchWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchWord(e.target.value);
  };

  const handleSearchCompany = () => {
    let searchResult: string = "noExistCompany";

    companyLists.forEach((company: CompanyProps) => {
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

  const handleStock1 = () => {
    dispatch(changeCompanyId(1));
  };

  const handleStock10 = () => {
    dispatch(changeCompanyId(10));
  };
  //

  if (kospiLoading) {
    return <LoadingContainer>{loadingText}</LoadingContainer>;
  }

  if (kospiError) {
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
      <button onClick={handleStock1}>1번 주식 버튼</button>
      <button onClick={handleStock10}>10번 주식 버튼</button>
      {/* 🔴 차트 변경 이벤트 테스트 */}
      <EChartsReact option={options} style={chartStyle} />
    </Container>
  );
};

export default KospiChart;

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
