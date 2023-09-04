import { useEffect } from "react";
import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";
import useGetStockData from "../../hooks/useGetStockData";
import useGetChart from "../../hooks/useGetChart";

const StockChart = () => {
  const { data, isLoading, error } = useGetStockData();
  const { options, chartStyle } = useGetChart();

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (error) {
    return <p>error</p>;
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
