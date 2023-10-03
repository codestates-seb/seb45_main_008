import { useSelector } from "react-redux";
import { StateProps } from "../models/stateProps";
import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useTradeStock = () => {
  const orderType = useSelector((state: StateProps) => state.stockOrderType);
  const companyId = useSelector((state: StateProps) => state.companyId);
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);
  const orderVolume = useSelector((state: StateProps) => state.stockOrderVolume);

  const queryClient = useQueryClient();
  const orderRequest = useMutation(() => postOrderRequest(orderType, companyId, orderPrice, orderVolume), {
    onSuccess: () => {
      queryClient.invalidateQueries("cash");
      queryClient.invalidateQueries("holdingStock");
      queryClient.invalidateQueries("orderRecord");

      queryClient.invalidateQueries("stockHolds");
      queryClient.invalidateQueries("money");
    },
  });
  return orderRequest;
};

export default useTradeStock;

const postOrderRequest = async (orderType: boolean, companyId: number, price: number, volume: number) => {
  const accessToken = localStorage.getItem("accessToken");

  const options = {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  // 매수
  if (!orderType) {
    const response = await axios.post(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/stock/buy?companyId=${companyId}&price=${price}&stockCount=${volume}`, {}, options);
    const orderResult = await response.data;

    return orderResult;
  }

  // 매도
  if (orderType) {
    const response = await axios.post(`http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/stock/sell?companyId=${companyId}&price=${price}&stockCount=${volume}`, {}, options);
    const orderResult = await response.data;

    return orderResult;
  }
};
