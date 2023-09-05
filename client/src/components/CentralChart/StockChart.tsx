import { useEffect } from "react";
import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";
import useGetStockData from "../../hooks/useGetStockData";
import useGetChart from "../../hooks/useGetChart";

const loadingText = "로딩 중 입니다...";
const errorText = "화면을 불러올 수 없습니다";

// 🔴test
import { useState } from "react";

const StockChart = () => {
  // 🔴test
  const [params, setParams] = useState(1);

  const handlePlus = () => {
    setParams((state) => state + 1);
  };

  const handleMinus = () => {
    setParams((state) => state - 1);
  };

  useEffect(() => {
    console.log(params);
  }, [params]);
  // 테스트

  const { isLoading, error } = useGetStockData(params);
  const { options, chartStyle } = useGetChart(params);

  if (isLoading) {
    return <LoadingContainer>{loadingText}</LoadingContainer>;
  }

  if (error) {
    return <ErrorContainer>{errorText}</ErrorContainer>;
  }

  return (
    <Container>
      <button onClick={handlePlus}>플러스 버튼</button>
      <button onClick={handleMinus}>마이너스 버튼</button>
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
