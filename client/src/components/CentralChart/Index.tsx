import { styled } from "styled-components";
import UpperMenuBar from "../CentralChartMenu/Index";
import StockChart from "./StockChart";
import useCompanyData from "../../hooks/useCompanyData";

const CentralChart = () => {
  const { isLoading: companyListLoading, isError: companyListError } = useCompanyData(1, 14);

  if (companyListLoading) {
    return <p>로딩중</p>;
  }

  if (companyListError) {
    return <p>에러 발생</p>;
  }

  return (
    <Container>
      <UpperMenuBar />
      <StockChart />
    </Container>
  );
};

export default CentralChart;

const Container = styled.div`
  flex: 6.7 0 0;
  min-width: 630px;
  height: 100%;

  display: flex;
  flex-direction: column;
`;
