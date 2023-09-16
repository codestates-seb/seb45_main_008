import { useState, useEffect } from "react";
import useGetStockData from "./useGetStockData";

const useGetStockChart = (companyId: number) => {
  const { stockPrice } = useGetStockData(companyId);
  const [chartData, setChartData] = useState<StockProps[]>([]);

  useEffect(() => {
    if (stockPrice) {
      setChartData(stockPrice);
    }
  }, [stockPrice]);

  // 🔴 테스트
  const organizeData = (rawData: StockProps[]) => {
    const time = [];
    const values = [];
    const volumes = [];

    for (let i = 0; i < rawData.length; i++) {
      // 날짜
      const date = new Date(rawData[i].stockTradeTime);
      const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const priceTime = `${hour}:${minute}`;
      time.push(priceTime);

      // 주가
      const openPrice = rawData[i].stck_oprc;
      const closePrice = rawData[i].stck_prpr;
      const lowestPrice = rawData[i].stck_lwpr;
      const highestPrice = rawData[i].stck_hgpr;
      values.push([openPrice, closePrice, lowestPrice, highestPrice]);

      // 거래량
      const volume = rawData[i].cntg_vol;
      const priceChange = openPrice < closePrice ? 1 : -1;
      volumes.push([i, volume, priceChange]);
    }
    return {
      time: time,
      values: values,
      volumes: volumes,
    };
  };

  // 색상
  const upColor = "#e22926";
  const downColor = "#2679ed";

  const organizedChartData = organizeData(chartData);

  const options = {
    animation: true,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 10,
      textStyle: {
        color: "#000",
      },
    },
    axisPointer: {
      link: [
        {
          xAxisIndex: "all",
        },
      ],
      label: {
        backgroundColor: "#777",
      },
    },
    toolbox: null,
    brush: {
      xAxisIndex: "all",
      brushLink: "all",
      outOfBrush: {
        colorAlpha: 0.1,
      },
    },
    visualMap: {
      show: false,
      seriesIndex: 5,
      dimension: 2,
      pieces: [
        {
          value: 1,
          color: downColor,
        },
        {
          value: -1,
          color: upColor,
        },
      ],
    },
    grid: [
      {
        containLabel: true,
        top: "0%",
        left: "0%",
        right: "0%",
        height: "70%",
      },
      {
        containLabel: true,
        left: "0%",
        right: "0%",
        top: "72.5%",
        height: "27%",
      },
    ],

    // 🟢 x축
    xAxis: [
      {
        type: "category",
        data: organizedChartData.time,
        boundaryGap: false,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#2f4f4f",
            width: 1,
            type: "solid",
          },
        },
        splitLine: { show: false },
        axisLabel: { show: false },
        axisTick: { show: false },
        min: "dataMin",
        max: "dataMax",
        axisPointer: {
          z: 100,
        },
      },
      {
        type: "category",
        gridIndex: 1,
        data: organizedChartData.time,
        boundaryGap: false,
        axisLine: {
          onZero: false,
          lineStyle: {
            color: "#2f4f4f",
            width: 1,
            type: "solid",
          },
        },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: {
          show: true,
          interval: Math.ceil(organizedChartData.time.length / 13),
          showMinLabel: false, // 왼쪽 끝단 텍스트 숨김
          showMaxLabel: false, //
        },
        min: "dataMin",
        max: "dataMax",
      },
    ],

    // 🟢 y축
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: false,
        },
        position: "right",
        axisLabel: {
          fontSize: "0.63rem",
          color: "#2f4f4f",
          fontWeight: "650",
          showMinLabel: false, // 왼쪽 끝단 텍스트 숨김
          showMaxLabel: false, //
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#2f4f4f",
            width: 1,
            type: "solid",
          },
        },
      },
      {
        scale: true,
        position: "right",
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#2f4f4f",
            width: 1,
            type: "solid",
          },
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0, 1],
        start: 0.5,
        end: 99.5,
      },
    ],
    series: [
      {
        name: "Dow-Jones index",
        type: "candlestick",
        data: organizedChartData.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: undefined,
          borderColor0: undefined,
        },
      },
      {
        name: "Volume",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        data: organizedChartData.volumes,
      },
    ],
  };

  // 스타일 설정
  const chartStyle = {
    width: "100%",
    height: "100% ",
    overflow: "hidden",
  };

  // 해당 값 리턴
  return { options, chartStyle };
};

export default useGetStockChart;

// // y축 눈금 옵션 설정하는 함수
// const calculateYAxisOptions = (data: StockProps[]) => {
//   const stockPrice = data.map((stock) => parseFloat(stock.stck_prpr));

//   const maxPrice = Math.max(...stockPrice);
//   const minPrice = Math.min(...stockPrice);

//   const interval = Math.ceil((maxPrice - minPrice) / 10);
//   const min = Math.floor(minPrice - interval * 5);

//   return { interval, min };
// };

interface StockProps {
  stockMinId: number;
  companyId: number;
  stockTradeTime: string;
  stck_cntg_hour: string;
  stck_prpr: string;
  stck_oprc: string;
  stck_hgpr: string;
  stck_lwpr: string;
  cntg_vol: string;
}
