// import { useEffect } from "react";
import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";
import useGetStockData from "../../hooks/useGetStockData";
import useGetChart from "../../hooks/useGetChart";

const loadingText = "로딩 중 입니다...";
const errorText = "화면을 불러올 수 없습니다";

const StockChart = () => {
  const { isLoading, error } = useGetStockData();
  const { options, chartStyle } = useGetChart();

  if (isLoading) {
    return <LoadingContainer>{loadingText}</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{errorText}</ErrorContainer>;
  }

  return (
    <Container>
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
