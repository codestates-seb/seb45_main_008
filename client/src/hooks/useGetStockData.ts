import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const useGetStockData = () => {
  const [fetching, setFetching] = useState(true);

  // 30분 or 정각여부 체크 함수
  const checkTime = () => {
    const currentTime = new Date();
    const minute = currentTime.getMinutes();

    (minute === 0 || minute === 30) && setFetching(false);
    return minute;
  };

  // 현재 시각이 30분, 정각이 아닌 경우 남은 시간 계산하여 checkTime 함수 다시 실행
  useEffect(() => {
    const checkMinute = checkTime();

    if (0 < checkMinute && checkMinute < 30) {
      const delayTime = (30 - checkMinute) * 60000;
      setTimeout(checkTime, delayTime);
    }
    if (30 < checkMinute && checkMinute < 60) {
      const delayTime = (60 - checkMinute) * 60000;
      setTimeout(checkTime, delayTime);
    }
  }, []);

  // 30분 정각이 될경우 서버 데이터 호출 + 30분 마다 데이터 갱신
  const { data, isLoading, error } = useQuery("chartData", getChartData, {
    enabled: fetching,
    refetchInterval: 60000 * 30,
    refetchOnMount: true,
  });

  return { data, isLoading, error };
};

export default useGetStockData;

// 차트 데이터 받아오는 fetching 로직
const getChartData = async () => {
  const res = await axios.get("http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/companies/charts/1");
  return res.data;
};
