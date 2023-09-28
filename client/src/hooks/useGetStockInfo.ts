import { useQuery } from "react-query";
import axios from "axios";

const url = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies/";

const useGetStockInfo = (companyId: number) => {
  const { data, isLoading, error } = useQuery(`stockInfo`, () => getStockInfo(companyId), {});

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
