import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const useDeleteStockOrder = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation((data: { orderId: number; cancleVolume: number }) => deleteStockOrder(data.orderId, data.cancleVolume), {
    onSuccess: () => {
      queryClient.invalidateQueries("holdingStock");
      queryClient.invalidateQueries("orderRecord");
    },
  });

  return mutate;
};

export default useDeleteStockOrder;

const deleteStockOrder = async (orderId: number, cancleVolume: number) => {
  const url = `http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/stock/stockorders?stockOrderId=${orderId}&stockCount=${cancleVolume}`;

  const accessToken = localStorage.getItem("accessToken");
  const options = {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.delete(url, options);
  return response;
};
