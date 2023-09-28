import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCashId, setMoney } from "../reducer/cash/cashSlice";
import { useSelector } from "react-redux";
import { RootState } from "../store/config";

const BASE_URL = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080";

const getAuthHeader = () => {
  const accessToken = sessionStorage.getItem("accessToken");
  return {
    Authorization: `${accessToken}`,
  };
};

export const useCreateCash = () => {
  const dispatch = useDispatch();
  return useMutation(
    (initialAmount: string) =>
      axios.post(
        `${BASE_URL}/cash`,
        { money: initialAmount },
        {
          headers: getAuthHeader(),
        }
      ),
    {
      onSuccess: (res) => {
        dispatch(setCashId(res.data.cashId));
        dispatch(setMoney(res.data.money));
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
};

export const useGetCash = () => {
  const dispatch = useDispatch();
  const queryFn = () => {
    return axios.get(`${BASE_URL}/cash`, {
      headers: getAuthHeader(),
    });
  };

  return useQuery("money", queryFn, {
    onSuccess: (res) => {
      dispatch(setCashId(res.data.cashId));
      dispatch(setMoney(res.data.money));
    },
    onError: (error) => {
      console.error(error);
    },
    refetchInterval: false,
    retry: false,
    staleTime: 1000 * 60 * 5,
  });
};

export const useResetCash = () => {
  const cashId = useSelector((state: RootState) => state.cash.cashId);
  const dispatch = useDispatch();

  return useMutation(
    (data: { money: string }) =>
      axios.patch(
        `${BASE_URL}/cash/${cashId}`,
        { money: data.money },
        {
          headers: getAuthHeader(),
        }
      ),
    {
      onSuccess: (data) => {
        dispatch(setCashId(data.data.cashId));
        dispatch(setMoney(data.data.money));
      },
      onError: (error) => {
        console.error(error);
      },
    }
  );
};
