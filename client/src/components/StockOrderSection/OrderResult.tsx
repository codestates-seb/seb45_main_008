import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styled } from "styled-components";
import useGetStockOrderRecord from "../../hooks/useGetStockOrderRecord";
import { OrderRecordProps } from "../../models/stockProps";

import OrderedStock from "./OrderedStock";

const titleText01: string = "체결 내역";
const titleText02: string = "미체결 내역";
const orderPendingEmptyMessage: string = "거래 내역이 없습니다";

const OrderResult = () => {
  const { orderRecordData } = useGetStockOrderRecord();
  const [recordType, setRecordType] = useState(true);

  const orderWaitList = orderRecordData.filter((order: OrderRecordProps) => order.orderStates === "ORDER_WAIT");
  const orderCompleteList = orderRecordData.filter((order: OrderRecordProps) => order.orderStates === "ORDER_COMPLETE");

  const orderList = recordType ? orderCompleteList : orderWaitList;
  const orderListNum = orderList.length;

  const handleChangeRecordType = (type: string) => {
    if (type === "complete") {
      setRecordType(true);
    }

    if (type === "wait") {
      setRecordType(false);
    }
  };

  // 거래 발생 유형에 따라 자동으로 거래내역 창 변경
  useEffect(() => {
    setRecordType(false);
  }, [orderWaitList.length]);

  useEffect(() => {
    setRecordType(true);
  }, [orderCompleteList.length]);

  return (
    <Container recordType={recordType}>
      <div className="titleContainer">
        <div className="completeTitle" onClick={() => handleChangeRecordType("complete")}>
          {titleText01}
        </div>
        <div className="waitTitle" onClick={() => handleChangeRecordType("wait")}>
          {titleText02}
        </div>
      </div>
      <TradeWaiting>
        {orderListNum === 0 ? (
          <div className="emptyIndicator">{orderPendingEmptyMessage}</div>
        ) : (
          <>
            {orderList.map((stock: OrderRecordProps, index: number) => {
              const orderType = stock.orderTypes === "BUY" ? "매수" : "매도";
              const price = stock.price;
              const volume = stock.stockCount;
              const companyId = stock.companyId;
              const orderId = stock.stockOrderId;

              // 거래 시간
              const recordTime = stock.modifiedAt;
              const orderDate = new Date(recordTime);
              const year = orderDate.getFullYear();
              const month = orderDate.getMonth() + 1 < 10 ? `0${orderDate.getMonth() + 1}` : orderDate.getMonth() + 1;
              const date = orderDate.getDate() < 10 ? `0${orderDate.getDate()}` : orderDate.getDate();
              const hour = orderDate.getHours() < 10 ? `0${orderDate.getHours()}` : orderDate.getHours();
              const minute = orderDate.getMinutes() < 10 ? `0${orderDate.getMinutes()}` : orderDate.getMinutes();
              const orderTime = `${year}-${month}-${date} ${hour}:${minute}`;

              return (
                <motion.div key={orderId} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                  <OrderedStock index={index} recordType={recordType} orderType={orderType} orderPrice={price} orderVolume={volume} orderTime={orderTime} companyId={companyId} orderId={orderId} />
                </motion.div>
              );
            })}
          </>
        )}
      </TradeWaiting>
    </Container>
  );
};

export default OrderResult;

// component 생성
const Container = styled.div<{ recordType: boolean }>`
  width: 100%;
  height: calc(100vh - 570px);
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .titleContainer {
    display: flex;
    flex-direction: row;
  }

  .waitTitle {
    font-size: 16px;
    font-weight: 500;
    padding-left: 16px;
    padding-bottom: 16px;
    color: ${(props) => (props.recordType ? "#9999" : "black")};
    transition: color 0.5s ease;
  }

  .completeTitle {
    font-size: 16px;
    font-weight: 500;
    padding-left: 16px;
    padding-bottom: 16px;
    color: ${(props) => (props.recordType ? "black" : "#9999")};
    transition: color 0.5s ease;
  }
`;

const TradeWaiting = styled.div`
  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  .title {
    padding-left: 16px;
    margin-bottom: 8px;
  }

  .emptyIndicator {
    width: 100%;
    height: 55%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1em;
    font-weight: 350;
    color: #9999;
  }

  .layoutComposition {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 350;
    color: white;
  }
`;
