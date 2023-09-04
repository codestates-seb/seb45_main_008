import { styled } from "styled-components";
import EChartsReact from "echarts-for-react";

const StockChart = () => {
  return (
    <Container>
      <EChartsReact option={options} style={chartStyle} />
    </Container>
  );
};

export default StockChart;

const options = {
  xAxis: {
    type: "category",
  },
  yAxis: [
    {
      type: "value",
      position: "right", // 오른쪽에 위치
    },
  ],
  dataZoom: [
    {
      type: "inside", // 마우스 스크롤을 통한 줌 인/아웃 지원
    },
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross", // 마우스 위치에 눈금 표시
    },
  },
  series: [
    {
      name: "주가",
      type: "candlestick", // 캔들스틱 시리즈
      data: [
        [100, 120, 80, 90], // 시가, 종가, 저가, 주가
        [110, 130, 100, 120],
        [90, 110, 70, 100],
        [95, 105, 85, 110],
        [105, 125, 95, 120],
        [110, 120, 100, 130],
        [120, 140, 110, 150],
        [130, 150, 120, 160],
        [140, 160, 130, 170],
        [150, 170, 140, 180],
        [150, 170, 140, 180],
        [160, 180, 150, 190],
        [170, 190, 160, 200],
        [170, 200, 170, 210],
        [170, 140, 130, 130],
        [150, 160, 120, 160],
        [140, 160, 130, 170],
        [150, 170, 140, 180],
        [140, 125, 95, 120],
        [110, 120, 100, 130],
        [120, 140, 110, 150],
        [130, 150, 120, 160],
        [140, 160, 130, 170],
        [150, 170, 140, 180],
        [160, 180, 150, 190],
        [170, 190, 160, 200],
        [180, 200, 170, 210],
        [190, 210, 180, 220],
      ],
      yAxisIndex: 0, // 첫 번째 Y 축 사용
    },
  ],
};

const chartStyle = {
  width: "100%",
  height: "100%",
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
