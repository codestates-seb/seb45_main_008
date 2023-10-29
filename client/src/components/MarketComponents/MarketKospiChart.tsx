import * as echarts from "echarts";
import { styled } from "styled-components";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const MarketkospiChart = () => {
  const [kospiData, setKospiData] = useState([]);

  const { data, isLoading, error } = useQuery("kospi", getKospiData, {
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setKospiData(data);
    }
  }, [data]);

  useEffect(() => {
    const myChart = echarts.init(document.getElementById("main"));

    if (isLoading) {
      // 데이터 로딩 중인 경우 로딩 메시지를 표시
      myChart.showLoading();
    } else {
      // 데이터 로딩이 완료된 경우
      myChart.hideLoading();

      if (error) {
        // 데이터 로딩 중 오류가 발생한 경우
        console.error("Error fetching data:", error);
      } else {
        myChart.setOption({
          title: {
            text: "Kospi",
            left: "center",
          },
          tooltip: {
            trigger: "axis",
          },

          xAxis: {
            type: "category",
            boundaryGap: true,
            data: kospiData.map((kospi: KospiProps) => {
              // const year = kospi.stck_bsop_date.slice(0, 4);
              const month = kospi.stck_bsop_date.slice(4, 6);
              const period = ` ${month}월`;
              return period;
            }),
          },
          yAxis: [
            {
              type: "value",
              boundaryGap: [0, "10%"],
              position: "right",
              interval: 100,
              min: 2000,
              splitLine: {
                show: true,
              },
            },
          ],

          series: [
            {
              name: "코스피 지수",
              type: "line",
              symbol: "none",
              sampling: "lttb",
              itemStyle: {
                color: function (params: { data: number[] }) {
                  // 주식 상승이면 빨간색, 하락이면 파란색 반환
                  return params.data[1] >= params.data[0] ? "#f87369" : "#5a99f8";
                },
              },
              areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#5a99f8",
                  },
                  {
                    offset: 1,
                    color: "white",
                  },
                ]),
              },

              data: kospiData.map((item: KospiProps, index: number, array: KospiProps[]) => {
                const currentPrice = parseFloat(item.bstp_nmix_oprc);
                const previousPrice =
                  index > 0 ? parseFloat(array[index - 1].bstp_nmix_oprc) : currentPrice;

                // 현재 가격과 이전 가격을 비교하여 색상 설정
                const color = currentPrice > previousPrice ? "#f87369" : "#5a99f8";

                return {
                  value: currentPrice,
                  itemStyle: {
                    color: color,
                  },
                };
              }),
            },
          ],
          grid: {
            left: "5%",
            right: "15%",
            top: "20%",
            bottom: "10%",
          },
        });
      }
    }
  }, [isLoading, error, kospiData]);

  return <KospiChartStyle id="main"></KospiChartStyle>;
};

export default MarketkospiChart;

const getKospiData = async () => {
  const res = await axios.get("http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com/kospi");
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
  param: string;
}

const KospiChartStyle = styled.div`
  margin: 0px;
  width: 100%;
  height: 200px;
`;
