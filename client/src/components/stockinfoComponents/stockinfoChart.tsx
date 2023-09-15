import React, { useEffect } from "react";
import * as echarts from "echarts";

const PortFolioChart = () => {
  useEffect(() => {
    // 차트를 초기화하고 옵션을 설정합니다.
    const myPortFolioChart = echarts.init(document.getElementById("main"));

    const option = {
      tooltip: {
        trigger: "item",
      },
      legend: {
        top: "5%",
        left: "center",
      },
      series: [
        {
          name: "보유주식",
          type: "pie",
          radius: ["40%", "70%"],

          avoidLabelOverlap: false,
          label: {
            show: false,
            position: "center",
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 25,
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          data: [
            { value: 1048, name: "삼성전자" },

            { value: 735, name: "LG" },

            { value: 484, name: "POSCO홀딩스" },
          ],
        },
      ],
    };

    // 차트에 옵션을 설정합니다.
    myPortFolioChart.setOption(option);

    // 컴포넌트가 언마운트될 때 차트를 제거합니다.
    return () => {
      myPortFolioChart.dispose();
    };
  }, []);

  return <div id="main" style={{ width: "100%", height: "400px" }}></div>;
};

export default PortFolioChart;
