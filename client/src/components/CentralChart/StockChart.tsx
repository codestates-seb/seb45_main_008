import { useSelector } from "react-redux";
import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";
import { StateProps } from "../../models/stateProps";

import useGetStockData from "../../hooks/useGetStockData";
import useGetStockChart from "../../hooks/useGetStockChart";

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
  overflow: hidden;
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
