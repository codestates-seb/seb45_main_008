import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const url = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/stock/stockorders/";

const useDeleteStockOrder = () => {
  const queryClient = useQueryClient();

  const mutate = useMutation((orderId: number) => deleteStockOrder(orderId), {
    onSuccess: () => {
      queryClient.invalidateQueries("holdingStock");
      queryClient.invalidateQueries("orderRecord");
    },
  });

  return mutate;
};

export default useDeleteStockOrder;

const deleteStockOrder = async (orderId: number) => {
  const authToken = localStorage.getItem("authToken");
  const options = {
    headers: {
      Authorization: `${authToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.delete(`${url}${orderId}`, options);
  return response;
};
