import * as echarts from "echarts";
import { styled } from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const MarketkospiChart = () => {
  const KospiDataFromServer = async () => {
    try {
      const response = await axios.get(KospiDataServerUrl);
      const KospiData = response.data;
      setKospiDatas(KospiData.output1);
      console.log(kospiDatas, "kospi");
      console.log(kospiDatas);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };
  const KospiDataServerUrl =
    "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/kospi";
  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져오도록 useEffect를 사용
    KospiDataFromServer();
  }, []);

  const [kospiDatas, setKospiDatas] = useState<string | object>({});

  useEffect(() => {
    // 컴포넌트가 마운트될 때 ECharts 차트를 그립니다.
    const myChart = echarts.init(document.getElementById("main"));

    myChart.setOption({
      title: {
        text: "Kospi",
      },
      tooltip: {},
      xAxis: {
        type: "category",
        data: ["2023년1월", "2023년5월", "2023년9월"],
      },
      yAxis: {},
      series: [
        {
          name: "sales",
          type: "line",
          data: [2000, 2200, 2400, 2600, 2800, 3000],
        },
      ],
    });
  }, []); // useEffect는 컴포넌트가 마운트될 때 한 번만 실행하도록 빈 배열을 전달합니다.

  return <KospiChartStyle id="main"></KospiChartStyle>;
};

export default MarketkospiChart;

const KospiChartStyle = styled.div`
  width: 100%;
  height: 300px;
`;
