import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { StateProps } from "../models/stateProps";

const url = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/cash";

const useGetCash = () => {
  const isLogin = useSelector((state: StateProps) => state.login);

  const { data, isLoading, isError } = useQuery("cash", getCashData, {
    enabled: isLogin === 1,
  });

  return { cashData: data, cashLoading: isLoading, cashError: isError };
};

export default useGetCash;

const getCashData = async () => {
  const accessToken = sessionStorage.getItem("accessToken");
  const options = {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(url, options);
  const cash = await response.data.money;
  return cash;
};
