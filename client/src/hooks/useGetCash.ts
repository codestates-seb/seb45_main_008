import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import axios from "axios";
import { StateProps } from "../models/stateProps";

// 🔴 API 수정 전으로 임시 파라미터 설정해놓음
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
  const token = localStorage.getItem("Authorization");
  const options = {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(url, options);
  const cash = await response.data.money;
  return cash;
};
