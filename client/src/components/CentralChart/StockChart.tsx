import { useSelector } from "react-redux";
import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";
import { StateProps } from "../../models/stateProps";

import useGetStockData from "../../hooks/useGetStockData";
import useGetStockChart from "../../hooks/useGetStockChart";
import CompareChartBtn from "./CompareChartBtn";

const loadingText = "로딩 중 입니다...";
const errorText = "화면을 불러올 수 없습니다";

const StockChart = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);

  const { stockPriceLoading, stockPriceError } = useGetStockData(companyId);
  const { options, chartStyle } = useGetStockChart(companyId);

  if (stockPriceLoading) {
    return <LoadingContainer>{loadingText}</LoadingContainer>;
  }

  if (stockPriceError) {
    return <ErrorContainer>{errorText}</ErrorContainer>;
  }

  return (
    <Container>
      <ChartContainer>
        <EChartsReact option={options} style={chartStyle} />
      </ChartContainer>
      <CompareChartBtn />
    </Container>
  );
};

export default StockChart;

const Container = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 2;
`;

const ChartContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
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
