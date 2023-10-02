import { isHoliday } from "@hyunbinseo/holidays-kr";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const url = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com/companies/charts/";

const useGetStockData = (companyId: number) => {
  const [autoRefetch, setAutoRefetch] = useState(false);

  // 1) 주말, 공휴일 여부 체크
  const today = new Date();
  const isBusinessDay = !isHoliday(today, { include: { saturday: true, sunday: true } }); // 토요일, 일요일, 공휴일 (임시 공휴일 포함)

  // 2) 개장시간 여부 체크
  const currentHour = today.getHours();
  const currentMinute = today.getMinutes();
  const isBefore9AM = currentHour < 9;
  const isAfter330PM = currentHour > 15 || (currentHour === 15 && currentMinute >= 30);
  const marketCloseTime = isBefore9AM || isAfter330PM;

  const dataRenewalTime = isBusinessDay || !marketCloseTime;

  // 시간대 (timeZone) 별로 queryKey를 다르게 설정해서, 서버 데이터가 동일할 때는 캐싱된 데이터 활용하고 서버 데이터가 갱신됐을 때는 새롭게 받아옴 (서버 데이터 30분마다 갱신)
  const currentTime = new Date();
  const [month, day, hour, minute] = [currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes()];
  const timeZone = minute === 0 || minute === 30 ? "30 or 60" : 0 < minute && minute < 30 ? "1~29" : "31~59";
  const queryKey = dataRenewalTime ? `chartData${companyId} ${month}월 ${day}일 ${hour}시 ${timeZone}` : `chartData${companyId}`;

  // 개장 시간 이내일 경우, 현재 시각이 30분, 정각이 아닌 경우 남은 시간 계산하여 checkTime 함수 다시 실행
  useEffect(() => {
    if (dataRenewalTime) {
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
    }
  }, []);

  const { data, isLoading, error, refetch } = useQuery(queryKey, () => getChartData(companyId), {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchInterval: autoRefetch && dataRenewalTime ? 60000 * 30 : false, // 정각 혹은 30분에 맞춰서 30분 마다 데이터 리패칭
  });

  return { stockPrice: data, stockPriceLoading: isLoading, stockPriceError: error };
};

export default useGetStockData;

const getChartData = async (companyId: number) => {
  const res = await axios.get(`${url}${companyId}`);
  return res.data;
};
