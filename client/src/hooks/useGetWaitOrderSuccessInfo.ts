import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const url = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/long-polling/listen";

const useGetWaitOrderSuccessInfo = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery("waitOrderSuccess", getWaitOrderSuccessInfo, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("cash");
      queryClient.invalidateQueries("holdingStock");
      queryClient.invalidateQueries("orderRecord");
      refetch();
      console.log("예약주문 처리 테스트");
      console.log(data);
    },
  });

  return { waitOrderSuccessData: data, waitOrderSuccessLoading: isLoading, waitOrderSuccessError: isError };
};

export default useGetWaitOrderSuccessInfo;

const getWaitOrderSuccessInfo = async () => {
  const accessToken = localStorage.getItem("accessToken");
  const options = {
    headers: {
      Authorization: `${accessToken}`,
      "Content-Type": "application/json",
    },
  };

  const response = await axios.get(url, options);
  const orderInfo = await response.data;
  return orderInfo;
};
