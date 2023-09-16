import { useState, useEffect } from "react";
import useGetStockData from "./useGetStockData";
import useGetStockInfo from "./useGetStockInfo";

// 색상
const upColor = "rgba(198, 6, 6, 0.37)";
const downColor = "rgba(59, 119, 247, 0.51)";
const volumColor = "rgba(57, 118, 249, 0.56)";
const pointerColor = "#cc3c3a";
const indexColor = "#4479c2";
// const indexColor = "#cc3c3a";

const useGetStockChart = (companyId: number) => {
  const { stockPrice } = useGetStockData(companyId);
  const { stockInfo } = useGetStockInfo(companyId);
  const [chartData, setChartData] = useState<StockProps[]>([]);
  const [corpName, setCorpName] = useState("");

  useEffect(() => {
    if (stockPrice && stockInfo) {
      setChartData(stockPrice);
      setCorpName(stockInfo.korName);
    }
  }, [stockPrice, stockInfo]);

  // 🔴 테스트
  const organizeData = (rawData: StockProps[]) => {
    const tooltipTitle = [];
    const time = [];
    const values = [];
    const volumes = [];

    for (let i = 0; i < rawData.length; i++) {
      // 날짜
      const date = new Date(rawData[i].stockTradeTime);
      console.log(date);

      // 2) 1축 날짜
      const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
      const minute = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
      const priceTime = `${hour}:${minute}`;
      time.push(priceTime);

      // 2) 툴팁 날짜
      const dayList = ["일", "월", "화", "수", "목", "금", "토"];

      const year = date.getFullYear();
      const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
      const dayOfWeek = dayList[date.getDay()];
      const tooltipDay = `${year}.${month}.${day}(${dayOfWeek}) ${priceTime}`;
      tooltipTitle.push(tooltipDay);

      // 주가
      const openPrice = parseInt(rawData[i].stck_oprc);
      const closePrice = parseInt(rawData[i].stck_prpr);
      const lowestPrice = parseInt(rawData[i].stck_lwpr);
      const highestPrice = parseInt(rawData[i].stck_hgpr);
      values.push([openPrice, closePrice, lowestPrice, highestPrice]);

      // 거래량
      const volume = parseInt(rawData[i].cntg_vol);
      const priceChange = openPrice < closePrice ? 1 : -1;
      volumes.push([i, volume, priceChange]);
    }
    return {
      tooltipTitle: tooltipTitle,
      time: time,
      values: values,
      volumes: volumes,
    };
  };

  const organizedChartData = organizeData(chartData);

  const options = {
    animation: true,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      formatter: (params: any) => {
        const dataIndex = params[0]?.dataIndex || 0;

        const date = organizedChartData.tooltipTitle[dataIndex];
        const dataPoint = organizedChartData.values[dataIndex];
        const openPrice = dataPoint[0].toLocaleString();
        const closePrice = dataPoint[1].toLocaleString();
        const highPrice = dataPoint[2].toLocaleString();
        const lowPrice = dataPoint[3].toLocaleString();
        const volume = organizedChartData.volumes[dataIndex][1].toLocaleString();

        // 툴팁 내용을 원하는 형식으로 조합
        const tooltipContent = `
          ${date}<br/><br/>
          📈 ${corpName}<br/>
          • 시가 ${openPrice} 원<br/>
          • 종가 ${closePrice} 원<br/>
          • 고가 ${highPrice} 원<br/>
          • 저가 ${lowPrice} 원<br/>
          • 거래량 ${volume} 주<br/>
        `;

        return tooltipContent;
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
        color: pointerColor,
        backgroundColor: "transparent",
      },
    },
    toolbox: { show: false },
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
            color: "black",
            width: 1,
            type: "solid",
          },
        },
        splitLine: { show: false, interval: 100 },
        axisLabel: { show: false },
        axisTick: { show: false },
        min: "dataMin",
        max: "dataMax",
        gridIndex: 0,
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
            color: "black",
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
          showMaxLabel: false,
          color: "black",
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
          show: true,
        },
        splitLine: {
          show: false,
        },
        position: "right",
        axisLabel: {
          fontSize: "12px",
          color: indexColor,
          fontWeight: "500",
          showMinLabel: false, // 왼쪽 끝단 텍스트 숨김
          showMaxLabel: false,
          inside: true,
          padding: 10,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "black",
            width: 1,
            type: "solid",
          },
        },
        gridIndex: 0,
      },
      {
        scale: true,
        position: "right",
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: true, inside: true, color: indexColor, padding: 10, showMinLabel: false, showMaxLabel: false, fontWeight: "500" },
        axisTick: { show: false },
        splitLine: { show: false },
        splitArea: {
          show: true,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "black",
            width: 1,
            type: "solid",
          },
        },
        offset: 0, // 두 번째 y축을 오른쪽으로 이동하여 겹치지 않게 함
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
        name: `${corpName} 주가`,
        type: "candlestick",
        data: organizedChartData.values,
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: undefined,
          borderColor0: undefined,
        },
        yAxisIndex: 0,
      },
      {
        name: "거래량",
        type: "bar",
        xAxisIndex: 1,
        data: organizedChartData.volumes,
        yAxisIndex: 1,
        itemStyle: {
          color: volumColor, // 원하는 색상으로 설정
        },
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
