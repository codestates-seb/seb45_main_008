import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { isHoliday } from "@hyunbinseo/holidays-kr";
import axios from "axios";

const url = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies/";

const useGetStockInfo = (companyId: number) => {
  const [autoRefetch, setAutoRefetch] = useState(false);

  // 1) 주말, 공휴일 여부 체크
  const currentTime = new Date();
  const isBusinessDay = !isHoliday(currentTime, { include: { saturday: true, sunday: true } }); // 토요일, 일요일, 공휴일 (임시 공휴일 포함)

  // 2) 개장시간 여부 체크
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();
  const isBefore9AM = currentHour < 9;
  const isAfter330PM = currentHour > 15 || (currentHour === 15 && currentMinute >= 30);
  const marketCloseTime = isBefore9AM || isAfter330PM;

  const dataRenewalTime = isBusinessDay && !marketCloseTime;

  // 시간대 (timeZone) 별로 queryKey를 다르게 설정해서, 서버 데이터가 동일할 때는 캐싱된 데이터 활용하고 서버 데이터가 갱신됐을 때는 새롭게 받아옴 (서버 데이터 30분마다 갱신)
  const [month, day, hour, minute] = [currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes()];
  const timeZone = minute === 0 || minute === 30 ? "30 or 60" : 0 < minute && minute < 30 ? "1~29" : "31~59";
  const queryKey = dataRenewalTime ? `stockInfo${companyId} ${month}월 ${day}일 ${hour}시 ${timeZone}` : `stockInfo${companyId}`;

  // 개장 시간 이내일 경우, 현재 시각이 30분, 정각이 아닌 경우 남은 시간 계산하여 checkTime 함수 다시 실행
  useEffect(() => {
    if (dataRenewalTime) {
      if (currentMinute === 0 || currentMinute === 30) {
        setAutoRefetch(true);
      } else if (0 < currentMinute && currentMinute < 30) {
        const delayTime = (30 - currentMinute) * 60000;
        setTimeout(() => {
          refetch();
          setAutoRefetch(true);
        }, delayTime);
      } else if (30 < currentMinute && currentMinute < 60) {
        const delayTime = (60 - currentMinute) * 60000;
        setTimeout(() => {
          refetch();
          setAutoRefetch(true);
        }, delayTime);
      }

      // 15시 30분까지 남은 시간
      const targetTime = new Date();
      targetTime.setHours(15);
      targetTime.setMinutes(30);
      const remainTime = targetTime.getTime() - currentTime.getTime();

      setTimeout(() => {
        setAutoRefetch(false);
      }, remainTime);
    }
  }, []);

  const { data, isLoading, error, refetch } = useQuery(queryKey, () => getStockInfo(companyId), {
    staleTime: Infinity,
    cacheTime: Infinity,
    refetchInterval: autoRefetch && dataRenewalTime ? 60000 * 30 : false, // 정각 혹은 30분에 맞춰서 30분 마다 데이터 리패칭
  });

  return { stockInfo: data, stockInfoLoading: isLoading, stockInfoError: error };
};

const getStockInfo = async (companyId: number) => {
  // 최초 마운트 시 비교차트 호출되지 않도록 설정
  if (companyId !== null) {
    const res = await axios.get(`${url}${companyId}`);
    const stockInfo = res.data;
    return stockInfo;
  }
};

export default useGetStockInfo;
