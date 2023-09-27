import { styled } from "styled-components";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import useGetMemberId from "../../hooks/useGetMemberId";
import * as Webstomp from "webstomp-client";
import { dummyLogo } from "../../dummy/dummyLogo";

const url = "ws://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/ws";
const corpName = ["삼성전자", "POSCO홀딩스", "셀트리온", "에코프로", "에코프로비엠", "디와이", "쿠쿠홀딩스", "카카오뱅크", "한세엠케이", "KG케마칼", "LG화학", "현대차", "LG전자", "기아"];

const volumeUnit = "주";
const toastText01: string = "미체결";
const toastText02: string = " 체결 처리 되었습니다";

const WaitOrderIndicator = () => {
  const { memberId } = useGetMemberId();
  const [waitOrder, setWaitOrder] = useState<WaitOrderProps | null>(null);

  useEffect(() => {
    if (memberId) {
      const socket = new WebSocket(url);
      const stompClient = Webstomp.over(socket);

      const headers = {
        memberId: memberId,
      };

      stompClient.connect(headers, () => {
        stompClient.subscribe(`/sub/${memberId}`, async (data) => {
          const responseData = JSON.parse(data.body);
          const orderType = responseData.orderTypes === "BUY" ? "매수" : "매도";
          const orderVolume = responseData.stockCount;
          const companyId = responseData.companyId;
          const result = { companyId: companyId, orderType: orderType, orderVolume: orderVolume };
          setWaitOrder(result);
        });
      });
    }
  }, [memberId]);

  useEffect(() => {
    if (waitOrder !== null) {
      const companyId = waitOrder.companyId;
      const type = waitOrder.orderType;
      const logo = dummyLogo[companyId - 1];
      const name = corpName[companyId - 1];
      const volume = waitOrder.orderVolume;

      toast(
        <ToastMessage orderType={type}>
          <div className="overview">
            <img src={logo} alt="stock logo" />
            <div className="orderInfo">
              {name} {volume}
              {volumeUnit}
            </div>
          </div>
          <div>
            <span className="orderType">
              ✓ {toastText01} {type}
            </span>
            <span>{toastText02}</span>
          </div>
        </ToastMessage>,
        {
          position: toast.POSITION.BOTTOM_LEFT,
          hideProgressBar: true,
        }
      );
    }
  }, [waitOrder]);

  return <div></div>;
};

export default WaitOrderIndicator;

interface WaitOrderProps {
  companyId: number;
  orderType: string;
  orderVolume: number;
}

const ToastMessage = styled.div<{ orderType: string }>`
  display: flex;
  flex-direction: column;
  gap: 7px;

  font-size: 14px;

  .overview {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 700;
    gap: 6px;
  }

  & img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding-bottom: 3px;
  }

  .orderType {
    color: ${(props) => (props.orderType === "매수" ? "#e22926" : "#2679ed")};
  }
`;
