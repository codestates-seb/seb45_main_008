import { useSelector } from "react-redux";
import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";
import { StateProps } from "../../models/stateProps";

import useGetStockChart from "../../hooks/useGetStockChart";
import CompareChartBtn from "./CompareChartBtn";

const StockChart = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const { options, chartStyle } = useGetStockChart(companyId);

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
  z-index: 1;
`;

const ChartContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
`;
