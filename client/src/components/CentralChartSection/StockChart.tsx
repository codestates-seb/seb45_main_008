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
  title: {
    text: "Stock Chart with Separate Y Axes on the Right Side",
  },
  xAxis: {
    type: "category",
    data: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
      "Day 11",
      "Day 12",
      "Day 13",
      "Day 14",
      "Day 15",
      "Day 16",
      "Day 17",
      "Day 18",
      "Day 19",
      "Day 20",
      "Day 21",
      "Day 22",
      "Day 23",
      "Day 24",
      "Day 25",
      "Day 26",
      "Day 27",
      "Day 28",
    ], // X 축 라벨
  },
  yAxis: [
    {
      type: "value",
      name: "Price", // 주가 Y 축 라벨
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
      name: "Price",
      type: "candlestick", // 캔들스틱 시리즈
      data: [
        [100, 120, 80, 90],
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
        [180, 200, 170, 210],
        [110, 120, 100, 130],
        [130, 150, 120, 160],
        [140, 160, 130, 170],
        [150, 170, 140, 180],
        [105, 125, 95, 120],
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

// 사이즈 조절을 위한 스타일 설정
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
  padding: 20px;
`;
