import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useGetKospiChart = () => {
  const [kospiData, setKospiData] = useState([]);

  const { data, isLoading, error } = useQuery(["kospi"], getKospiData, {});

  if (isLoading) {
    console.log("데이터 로딩중");
  }

  if (error) {
    console.log("에러 발생");
  }

  useEffect(() => {
    if (data) {
      setKospiData(data);
    }
  }, [data]);

  const options = {
    xAxis: {
      type: "category",
      data: kospiData.map((kospi: KospiProps) => {
        const year = kospi.stck_bsop_date.slice(0, 4);
        const month = kospi.stck_bsop_date.slice(4, 6);
        const period = `${year}년 ${month}월`;
        return period;
      }),
    },
    yAxis: [
      {
        type: "value",
        position: "right",
        interval: 50,
        min: 2000,
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
        name: "코스피 지수",
        type: "candlestick",
        data: kospiData.map((kospi: KospiProps) => {
          return [kospi.bstp_nmix_oprc, kospi.bstp_nmix_prpr, kospi.bstp_nmix_lwpr, kospi.bstp_nmix_hgpr];
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

  return { isLoading, error, options, chartStyle };
};

export default useGetKospiChart;

// kospi 차트 데이터 fetch 로직
const getKospiData = async () => {
  const res = await axios.get("http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/kospi");
  const chartData = res.data.output2;
  const kospiData = chartData.reverse();

  return kospiData;
};

interface KospiProps {
  acml_tr_pbmn: string;
  acml_vol: string;
  bstp_nmix_hgpr: string;
  bstp_nmix_lwpr: string;
  bstp_nmix_oprc: string;
  bstp_nmix_prpr: string;
  mod_yn: string;
  stck_bsop_date: string;
}
