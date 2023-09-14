// 🟢 기존 로직
import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const useGetStockData = (companyId: number) => {
  // 🟢 기존 로직
  const [autoRefetch, setAutoRefetch] = useState(false);
  const queryClient = useQueryClient();

  // 시간대 (timeZone) 별로 queryKey를 다르게 설정해서, 서버 데이터가 동일할 때는 캐싱된 데이터 활용하고 서버 데이터가 갱신됐을 때는 새롭게 받아옴 (서버 데이터 30분마다 갱신)
  const currentTime = new Date();
  const [month, day, hour, minute] = [currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes()];
  const timeZone = minute === 0 || minute === 30 ? "30 or 60" : 0 < minute && minute < 30 ? "1~29" : "31~59";
  const queryKey = `${month}월 ${day}일 ${hour}시 ${timeZone}`;

  // 현재 시각이 30분, 정각이 아닌 경우 남은 시간 계산하여 checkTime 함수 다시 실행
  useEffect(() => {
    if (minute === 0 || minute === 30) {
      setAutoRefetch(true);
    } else if (0 < minute && minute < 30) {
      const delayTime = (30 - minute) * 60000;
      setTimeout(() => {
        refetch();
        setAutoRefetch(true);
      }, delayTime);
    } else if (30 < minute && minute < 60) {
      const delayTime = (60 - minute) * 60000;
      setTimeout(() => {
        refetch();
        setAutoRefetch(true);
      }, delayTime);
    }
  }, []);

  const { data, isLoading, error, refetch } = useQuery(`chartData${companyId} ${queryKey}`, () => getChartData(companyId), {
    enabled: true,
    refetchInterval: autoRefetch ? 60000 * 10 : false, // 정각 혹은 30분에 맞춰서 10분 마다 데이터 리패칭
    onSuccess: () => {
      queryClient.invalidateQueries("cash");
      queryClient.invalidateQueries("holdingStock");
      queryClient.invalidateQueries("orderRecord");
    },
  });
  // 🟢 기존 로직

  // 🔴 테스트 로직
  // const queryClient = useQueryClient();

  // const { data, isLoading, error } = useQuery(`chartData`, () => getChartData(companyId), {
  //   enabled: true,
  //   refetchInterval: 1000 * 10, // 정각 혹은 30분에 맞춰서 10분 마다 데이터 리패칭
  //   onSuccess: () => {
  //     queryClient.invalidateQueries("cash");
  //     queryClient.invalidateQueries("holdingStock");
  //     queryClient.invalidateQueries("orderRecord");
  //   },
  // });
  // 🔴 테스트 로직

  return { stockPrice: data, stockPriceLoading: isLoading, stockPriceError: error };
};

export default useGetStockData;

// 차트 데이터 받아오는 fetch 로직
const getChartData = async (companyId: number) => {
  const res = await axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/companies/charts/${companyId}`);
  return res.data;
};
