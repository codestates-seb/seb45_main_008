import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { StateProps } from "../models/stateProps";

const url = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/stock/stockholds";

const useGetHoldingStock = () => {
  const isLogin = useSelector((state: StateProps) => state.login);

  const { data, isLoading, isError } = useQuery("holdingStock", getHoldingStock, {
    enabled: isLogin === 1,
  });
  return { holdingStockData: data, holdingStockLoading: isLoading, holdingStockError: isError };
};

export default useGetHoldingStock;

const getHoldingStock = async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const options = {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(url, options);
  const holdingStock = await response.data;
  return holdingStock;
};
