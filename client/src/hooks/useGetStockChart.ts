import { useState, useEffect } from "react";
import useGetStockData from "./useGetStockData";
import useGetStockInfo from "./useGetStockInfo";

// 색상
const upColor = "rgba(198, 6, 6, 0.37)";
const downColor = "rgba(59, 119, 247, 0.51)";
const volumColor = "rgba(57, 118, 249, 0.56)";
const pointerColor = "#cc3c3a";
const indexColor = "#4479c2";
const averageLineMinute = 10;

const useGetStockChart = (companyId: number) => {
  const { stockPrice } = useGetStockData(companyId);
  const { stockInfo } = useGetStockInfo(companyId);
  const [chartData, setChartData] = useState<StockProps[]>([]);
  const [corpName, setCorpName] = useState("");

  // 🔴 비교차트 테스트

  // ✅ 현재까지 구현된 부분 -> 비교차트 버튼을 누른다 -> 리스트가 뜬다 -> 리스트의 개별 요소를 누르면 비교해야할 회사의 companyId가 넘어온다
  // 🔴 (1. compare 데이터 불러오은 곳에서) 무엇을 해야하는가? 불러온 id 활용 -> stock 데이터를 불러온다 useEffect 활용하여, null 값이 아닐 경우 조건 걸어서 // null 값일 경우 데이터 날리기?-> 데이터를 불러오면 (useEffect 필요) -> organize 함수로 개량 후 상태로 지정한다
  //    (2. 메인 차트 불러오는 곳에서) 상태가 변경되면? -> 해당 값을 차트 데이터로 활용한다
  // 🔴 전역상태로 설정해야할 것,,,, -> 비교 차트 데이터? (버튼 눌렀을 때 ~ 변화가 되고, 비교 취소 했을 때 ~ null 값으로 바뀐다)

  // 서버에서 특정 종목 차트 데이터를 불러온다 -> 비교차트 id 활용
  // 해당 데이터를 orgziaed 함수로 개량하고
  // 개량된 데이터에서 현재값만 추출해서
  // 차트 정보에 추가해준다

  // const [compareChart, setCompare] = useState<CompareProps | undefined>(undefined);

  // const testData = organizeData(chartData);
  // const testPrice = testData.values;
  // const prPriceList: number[] = [];
  // // console.log(testPrice);
  // testPrice.forEach((price) => {
  //   prPriceList.push(price[0]);
  // });

  // console.log(prPriceList);
  // const testCompare = {
  //   name: "비교차트 테스트",
  //   type: "line",
  //   data: prPriceList,
  //   lineStyle: {
  //     opacity: 0.5,
  //   },
  //   yAxisIndex: 0,
  // };

  // useEffect(() => {
  //   setCompare(testCompare);
  // }, [testCompare]);

  // useEffect(() => {
  //   console.log(compareChart);
  // }, [compareChart]);

  // interface CompareProps {
  //   name: string;
  //   type: string;
  //   data: number[];
  //   lineStyle: { opacity: number };
  //   yAxisIndex: number;
  // }

  // 🔴 비교차트 테스트

  // 차트 데이터
  const organizedChartData = organizeData(chartData);
  const movingAvgLine = calculateMovingAvgLine(averageLineMinute, organizedChartData);

  useEffect(() => {
    if (stockPrice && stockInfo) {
      setChartData(stockPrice);
      setCorpName(stockInfo.korName);
    }
  }, [stockPrice, stockInfo]);

  // 차트 옵션
  const options = {
    animation: false,
    legend: {
      top: 10,
      left: "left",
      padding: [4, 0, 0, 15],
      data: [`주가`, `거래량`, `이동평균선 (${averageLineMinute}분)`],
    },
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
        <div style="width: 120px;">
          <div>${date}<br/><br/></div>
          <div>📈 ${corpName}<br/></div>
          <div>• 시가 ${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}<b>${openPrice}</b> 원<br/></div>
          <div>• 종가 ${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}<b>${closePrice}</b> 원<br/></div>
          <div>• 고가 ${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}<b>${highPrice}</b> 원<br/></div>
          <div>• 저가 ${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}<b>${lowPrice}</b> 원<br/></div>
          <div>• 거래량 ${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}${"&nbsp;"}<b>${volume}</b> 주<br/></div>
          <div>
        `;

        return tooltipContent;
      },
      borderWidth: 1,
      borderColor: "#ccc",
      padding: 15,
      textStyle: {
        color: "#000",
        fontSize: 12.5,
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
        height: "72.5%",
      },
      {
        containLabel: true,
        left: "0%",
        right: "0%",
        top: "72.6%",
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
        name: `주가`,
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
        name: `이동평균선 (${averageLineMinute}분)`,
        type: "line",
        data: movingAvgLine,
        smooth: true,
        lineStyle: {
          opacity: 0.5,
        },
        yAxisIndex: 0,
      },
      {
        name: `거래량`,
        type: "bar",
        xAxisIndex: 1,
        data: organizedChartData.volumes,
        yAxisIndex: 1,
        itemStyle: {
          color: volumColor, // 원하는 색상으로 설정
        },
      },
      // 🔴 비교차트 테스트
      // compareChart,
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

// 1) 차트 데이터 정리 (x축 날짜 데이터, y축 종가 및 거래량 데이터)
const organizeData = (rawData: StockProps[]) => {
  const tooltipTitle = [];
  const time = [];
  const values = [];
  const volumes = [];

  for (let i = 0; i < rawData.length; i++) {
    const date = new Date(rawData[i].stockTradeTime);

    // 1) x축 날짜
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

    // 3) 주가
    const openPrice = parseInt(rawData[i].stck_oprc);
    const closePrice = parseInt(rawData[i].stck_prpr);
    const lowestPrice = parseInt(rawData[i].stck_lwpr);
    const highestPrice = parseInt(rawData[i].stck_hgpr);
    values.push([openPrice, closePrice, lowestPrice, highestPrice]);

    // 4) 거래량
    const volume = parseInt(rawData[i].cntg_vol);
    const priceChange = openPrice < closePrice ? 1 : -1;
    volumes.push([i, volume, priceChange]);
  }
  return {
    time: time,
    tooltipTitle: tooltipTitle,
    values: values,
    volumes: volumes,
  };
};

// 2) 이동 평균선 데이터 정리
const calculateMovingAvgLine = (minuteCount: number, data: OrganizedChartProps) => {
  const result = [];
  const length = data.values.length;

  for (let i = 0; i < length; i++) {
    if (i < minuteCount) {
      result.push("-");
      continue;
    }

    let sum = 0;
    for (let j = 0; j < minuteCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / minuteCount).toFixed(3));
  }
  return result;
};

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

interface OrganizedChartProps {
  time: string[];
  tooltipTitle: string[];
  values: number[][];
  volumes: number[][];
}
