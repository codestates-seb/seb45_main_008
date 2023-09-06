import { useQuery } from "react-query";
import axios from "axios";

const useGetStockInfo = (companyId: number) => {
  const { data, isLoading, error } = useQuery(`stockInfo${companyId}`, () => getStockInfo(companyId), {});

  return { data, isLoading, error };
};

const getStockInfo = async (companyId: number) => {
  const res = await axios.get(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies/${companyId}`);
  const stockInfo = res.data;
  return stockInfo;
};

export default useGetStockInfo;
