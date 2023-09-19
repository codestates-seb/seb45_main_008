import { useEffect } from "react";
import { toast } from "react-toastify";

import useGetWaitOrderSuccessInfo from "../../hooks/useGetWaitOrderSuccessInfo";

const WaitOrderIndicator = () => {
  const { waitOrderSuccessData } = useGetWaitOrderSuccessInfo();

  const toastStyle = {
    fontSize: "15px",
    fontWeight: 450,
    color: "#2679ed",
  };

  useEffect(() => {
    if (waitOrderSuccessData) {
      toast.info(`대기주문이 체결되었습니다`, {
        style: toastStyle,
        position: "bottom-left",
      });
    }
  }, [waitOrderSuccessData]);

  return <div></div>;
};

export default WaitOrderIndicator;
