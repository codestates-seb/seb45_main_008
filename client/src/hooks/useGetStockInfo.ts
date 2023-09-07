import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const useGetStockInfo = (companyId: number) => {
  const [autoRefetch, setAutoRefetch] = useState(false);

  // 30분 or 정각여부 체크 함수 -> 30분 혹은 정각일 경우 api 1회 수동 요청 + 자동 요청 기능 활성화
  const checkTime = () => {
    const currentTime = new Date();
    const minute = currentTime.getMinutes();

    if (minute === 0 || minute === 30) {
      refetch();
      setAutoRefetch(true);
    }

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

  const { data, isLoading, error, refetch } = useQuery(`stockInfo${companyId}`, () => getStockInfo(companyId), {
    enabled: true,
    refetchInterval: autoRefetch && 60000 * 10, // 정각 혹은 30분에 맞춰서 10분 마다 데이터 리패칭
    refetchOnMount: true,
    onSuccess: () => {
      console.log(data);
    },
  });

  return { data, isLoading, error };
};

const getStockInfo = async (companyId: number) => {
  const res = await axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies/${companyId}`);
  const stockInfo = res.data;
  return stockInfo;
};

export default useGetStockInfo;
