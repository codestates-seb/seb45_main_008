import { useQuery, useQueryClient } from "react-query";
import axios from "axios";

const url = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/long-polling/listen";

const useGetWaitOrderSuccessInfo = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery("waitOrderSuccess", getWaitOrderSuccessInfo, {
    enabled: true,
    onSuccess: (data) => {
      console.log(new Date());
      console.log("미체결 거래 알림 성공");

      queryClient.invalidateQueries("cash");
      queryClient.invalidateQueries("holdingStock");
      queryClient.invalidateQueries("orderRecord");

      console.log(data);
      refetch();
      console.log("미체결 거래알림 재시작");
    },
    onError: () => {
      console.log("미체결 거래 알림 재요청");
      refetch();
    },
  });

  return { waitOrderSuccessData: data, waitOrderSuccessLoading: isLoading, waitOrderSuccessError: isError };
};

export default useGetWaitOrderSuccessInfo;

const getWaitOrderSuccessInfo = async () => {
  console.log("미체결 주문 처리대기 실행");
  const accessToken = sessionStorage.getItem("accessToken");
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
