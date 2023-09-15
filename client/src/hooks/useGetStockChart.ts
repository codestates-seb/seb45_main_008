import { useState, useEffect } from "react";
import useGetStockData from "./useGetStockData";

const useGetStockChart = (companyId: number) => {
  const { stockPrice } = useGetStockData(companyId);
  const [chartData, setChartData] = useState<StockProps[]>([]);
  const [yAxisInterval, setYAxisInterval] = useState(0);
  const [yAxisMinPrice, setYAxisMinPrice] = useState(0);

  // 서버에서 차트 데이터 fetching -> 클라이언트 화면에 활용할 차트 데이터 + 차트 y축 수치 상태 변화
  useEffect(() => {
    if (stockPrice) {
      setChartData(stockPrice);
      const { interval, min } = calculateYAxisOptions(stockPrice);
      setYAxisInterval(interval);
      setYAxisMinPrice(min);
    }
  }, [stockPrice]);

  const options = {
    xAxis: {
      type: "category",
      data: chartData.map((stock: StockProps) => {
        const date = new Date(stock.stockTradeTime);
        const tradeTime = `${date.getHours()}시 ${date.getMinutes()}분`;
        return tradeTime;
      }),
    },
    yAxis: [
      {
        type: "value",
        position: "right",
        interval: yAxisInterval,
        min: yAxisMinPrice,
        splitLine: {
          show: false,
        },
      },
    ],
    dataZoom: [
      {
        type: "inside",
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    series: [
      {
        name: "주가",
        type: "candlestick",
        data: chartData.map((stock: StockProps) => {
          return [stock.stck_oprc, stock.stck_prpr, stock.stck_lwpr, stock.stck_hgpr];
        }),
        yAxisIndex: 0,
      },
    ],
    grid: {
      left: "3%",
      right: "7%",
      top: "3%",
      bottom: "5%",
    },
  };

  const chartStyle = {
    width: "100%",
    height: "100%",
  };

  return { options, chartStyle };
};

export default useGetStockChart;

// y축 눈금 옵션 설정하는 함수
const calculateYAxisOptions = (data: StockProps[]) => {
  const stockPrice = data.map((stock) => parseFloat(stock.stck_prpr));

  const maxPrice = Math.max(...stockPrice);
  const minPrice = Math.min(...stockPrice);

  const interval = Math.ceil((maxPrice - minPrice) / 10);
  const min = Math.floor(minPrice - interval * 5);

  return { interval, min };
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
}
