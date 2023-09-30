import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { StateProps } from "../models/stateProps";
import { setCashId } from '../reducer/cash/cashSlice'; // Import setCashId action

const url = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/cash";

const useGetCashId = () => {
  const dispatch = useDispatch(); // Create a dispatch instance
  const isLogin = useSelector((state: StateProps) => state.login);

  const { data, isLoading, isError } = useQuery("cash", getCashData, {
    enabled: isLogin === 1,
    onSuccess: (data) => {
      dispatch(setCashId(data)); // Dispatch the setCashId action with fetched data
    },
    onError: (error) => {
      console.error("Error fetching cashId:", error);
    }
  });

  return { cashData: data, cashLoading: isLoading, cashError: isError };
};

export default useGetCashId;

const getCashData = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const options = {
      headers: {
        Authorization: `${accessToken}`,
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await axios.get(url, options);
      return response.data.cashId;
    } catch (error) {
      throw new Error((error as Error).message || "Failed to fetch cashId");
    }
  };