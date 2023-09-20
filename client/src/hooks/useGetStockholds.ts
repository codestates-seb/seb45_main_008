import { useQuery } from "react-query";
import axios from "axios";

const useGetStockHolds = () => {
  const { data, isLoading, error } = useQuery("stockHolds", getStockHolds, {});

  return { stockHolds: data, stockHoldsLoading: isLoading, stockHoldsError: error };
};

export default useGetStockHolds;

// 서버에서 StockHolds 목록 fetch 하는 함수
const getStockHolds = async () => {
  const accessToken = sessionStorage.getItem('accessToken');  // 로컬 스토리지에서 토큰 가져오기
  const res = await axios.get("http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/stock/stockholds", {
    headers: {
      'Authorization': accessToken
    }
  });
  const stockHoldsList = await res.data;

  return stockHoldsList;
};
