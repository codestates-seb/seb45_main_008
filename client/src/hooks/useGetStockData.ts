import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const useGetStockData = (companyId: number) => {
  const [refetch, setRefetch] = useState(false);

  // 30분 or 정각여부 체크 함수
  const checkTime = () => {
    const currentTime = new Date();
    const minute = currentTime.getMinutes();

    minute === 0 || minute === 30 ? setRefetch(true) : setRefetch(false);
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

  const { data, isLoading, error } = useQuery([`chartData${companyId}`, companyId], () => getChartData(companyId), {
    enabled: true,
    refetchInterval: refetch && 60000 * 10, // 정각 혹은 30분에 맞춰서 10분 마다 데이터 리패칭
    refetchOnMount: true,
    // onSuccess: () => {
    //   console.log(new Date());
    //   console.log(data);
    // },
  });

  return { data, isLoading, error };
};

export default useGetStockData;

// 차트 데이터 받아오는 refetch 로직
const getChartData = async (companyId: number) => {
  const res = await axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/companies/charts/${companyId}`);
  return res.data;
};
