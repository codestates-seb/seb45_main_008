import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { StateProps } from "../models/stateProps";

const url = "http://ec2-3-34-137-99.ap-northeast-2.compute.amazonaws.com:8080/stock/stockorders";

const useGetStockOrderRecord = () => {
  const isLogin = useSelector((state: StateProps) => state.login);
  const login = isLogin === 1;

  const { data, isLoading, isError } = useQuery("orderRecord", getOrderRecord, {
    enabled: login,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return { orderRecordData: data, orderRecordLoading: isLoading, orderRecordError: isError };
};

export default useGetStockOrderRecord;

const getOrderRecord = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(url, options);
  const orderRecord = await response.data;
  return orderRecord;
};
