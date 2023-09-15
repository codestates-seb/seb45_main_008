import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import useGetStockOrderRecord from "../../hooks/useGetStockOrderRecord";
import useGetCompanyList from "../../hooks/useGetCompanyList";
import useDeleteStockOrder from "../../hooks/useDeleteStockOrder";
import { OrderRecordProps } from "../../models/stockProps";

// dummyLogo
import dummyImg from "../../asset/CentralSectionMenu-dummyImg.png";

const priceUnit: string = "원";
const volumeUnit: string = "주";
const cancelButtonText: string = "주문취소";

const titleText01: string = "체결 내역";
const titleText02: string = "미체결 내역";
const orderPendingEmptyMessage: string = "거래 내역이 없습니다";

const OrderResult = () => {
  const { orderRecordData } = useGetStockOrderRecord();
  const [recordType, setRecordType] = useState(false);

  const orderWaitList = orderRecordData.filter((order: OrderRecordProps) => order.orderStates === "ORDER_WAIT");
  const orderCompleteList = orderRecordData.filter((order: OrderRecordProps) => order.orderStates === "ORDER_COMPLETE");

  // 최근 주문이 상단에 노출되도록 배열 순서 변경
  // orderWaitList.reverse();
  // orderCompleteList.reverse();
  const orderList = recordType ? orderCompleteList : orderWaitList;
  const orderListNum = orderList.length;

  const handleChangeRecordType = (type: string) => {
    if (type === "wait") {
      setRecordType(false);
    }

    if (type === "complete") {
      setRecordType(true);
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
            {orderList.map((stock: OrderRecordProps) => {
              const orderType = stock.orderTypes === "BUY" ? "매수" : "매도";
              const price = stock.price;
              const volume = stock.stockCount;
              const companyId = stock.companyId;
              const orderId = stock.stockOrderId;

              return (
                <motion.div
                  key={orderId}
                  initial={{ opacity: 0, y: -20 }} // 초기 상태
                  animate={{ opacity: 1, y: 0 }} // 애니메이션 중인 상태
                  exit={{ opacity: 0, y: -20 }} // 빠져나가는 상태
                >
                  <OrderedStock recordType={recordType} orderType={orderType} orderPrice={price} orderVolume={volume} companyId={companyId} orderId={orderId} />
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

// 개별 거래내역
const OrderedStock = (props: OrderdStockProps) => {
  const { orderType, orderPrice, orderVolume, companyId, orderId, recordType } = props;

  const [orderCancle, setOrderCancle] = useState(false);
  const { companyList } = useGetCompanyList();

  const dummyDate = "2023-09-15"; // dummyData
  const price = orderPrice.toLocaleString();
  const volume = orderVolume.toLocaleString();
  const totalOrderPrice = (orderPrice * orderVolume).toLocaleString();

  const corp = companyList.filter((corp: companyProps) => corp.companyId === companyId);
  const corpName = corp[0].korName;

  const handleSetOrderCancle = () => {
    setOrderCancle(!orderCancle);
  };

  return (
    <>
      <StockContainer orderType={orderType}>
        <div className="logoContainer">
          <img className="corpLogo" src={dummyImg} />
        </div>
        <div className="tradingOverview">
          <div className="corpName">{corpName}</div>
          <div className="orderInfo">
            <span className="orderType">{orderType}</span>
            <span className="price">
              {price}
              {priceUnit}
            </span>
            <span className="volume">
              {volume}
              {volumeUnit}
            </span>
          </div>
        </div>
        {recordType ? (
          <div className="orderRusultContainer">
            <div className="orderResult">
              <span className="totalPrice">{totalOrderPrice}</span>
              <span className="priceUnit">{priceUnit}</span>
            </div>
            <div className="orderDate">{dummyDate}</div>
          </div>
        ) : (
          <div className="buttonContainer">
            <button className="cancelButton" onClick={handleSetOrderCancle}>
              {cancelButtonText}
            </button>
          </div>
        )}
      </StockContainer>
      {orderCancle && <CancleConfirm corpName={corpName} orderType={orderType} orderPrice={orderPrice} orderVolume={orderVolume} companyId={companyId} orderId={orderId} setCancle={handleSetOrderCancle} />}
    </>
  );
};

// 주문 취소 확인창
const CancleConfirm = (props: CancelConfirmProps) => {
  const { corpName, orderType, orderPrice, orderVolume, orderId, setCancle } = props;

  const [cancleVolume, setCancleVolume] = useState(0);
  const deleteOrder = useDeleteStockOrder();

  const orderCancleText: string = "취소";
  const orderPriceText: string = "주문단가";
  const cancleVolumeText: string = "취소수량";
  const maximumCancleVolumeText01: string = "최대";
  const maximumCancleVolumeText02: string = "주";
  const totalCancleAmountText: string = "총 취소금액";
  const closeButtonText: string = "닫기";
  const confirmButtonText: string = "확인";
  const toastText01: string = "취소";
  const toastText02: string = " 처리가 완료되었습니다";
  const price = orderPrice.toLocaleString();
  const totalPrice = (orderPrice * cancleVolume).toLocaleString();

  const handleChangeCancleVolume = (direction: string) => {
    if (direction === "Up") {
      cancleVolume < orderVolume && setCancleVolume((previousState) => previousState + 1);
    }
    if (direction === "Down") {
      0 < cancleVolume && setCancleVolume((previousState) => previousState - 1);
    }
  };

  // 거래량 직접 기입 시
  const handleWriteCancleVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numberInputValue = parseInt(inputValue, 10);

    // 1) 음수를 임력하거나, 숫자 아닌 값 기입 시 -> 입력 무시  2) 값을 다 지워서 빈 문자열인 경우 -> 0으로 설정  3) 취소가능 수량 보다 높게 기입 -> 입력 무시
    if (numberInputValue < 0 || isNaN(numberInputValue)) {
      if (inputValue === "") {
        setCancleVolume(0);
      }
      return;
    }

    if (orderVolume < numberInputValue) {
      return;
    } else {
      setCancleVolume(numberInputValue);
    }
  };

  const handleDeleteWaitOrder = () => {
    deleteOrder.mutate({ orderId, cancleVolume });
    const { isLoading, isError } = deleteOrder;

    if (isLoading) {
      console.log("주문 삭제 처리 중");
    }

    if (isError) {
      console.log("주문 삭제 실패");
    }

    toast(
      <ToastMessage orderType={orderType}>
        <div className="overview">
          <img src={dummyImg} />
          <div className="orderInfo">
            {corpName} {cancleVolume}
            {volumeUnit}
          </div>
        </div>
        <div>
          <span className="orderType">
            ✓ {orderType}
            {toastText01}
          </span>
          <span>{toastText02}</span>
        </div>
      </ToastMessage>,
      {
        position: toast.POSITION.BOTTOM_LEFT,
        // autoClose: 2000,
        hideProgressBar: true,
      }
    );

    setCancle(); // 모달 창 닫기
  };

  return (
    <CancelConfirm orderType={orderType}>
      <div className="Container">
        <img className="CorpLogo" src={dummyImg} />
        <div className="OrderOverview">
          <span className="CorpName">{corpName}</span>
          <span className="OrderType">{orderType}</span>
          <span className="orderCancel">{orderCancleText}</span>
        </div>
        <div className="OrderContent">
          <div className="priceContent">
            <span className="text">{orderPriceText}</span>
            <span>
              {price} {priceUnit}
            </span>
          </div>
          <div className="volumeContent">
            <div className="text cancleVolumeText">
              <span>{cancleVolumeText}</span>
              <span className="maximumCancleVolume">
                {maximumCancleVolumeText01}
                <span className="maximumVolumeNum"> {orderVolume} </span>
                {maximumCancleVolumeText02}
              </span>
            </div>
            <VolumeSettingBox>
              <VolumeController defaultValue={cancleVolume} value={cancleVolume} onChange={handleWriteCancleVolume} />
              <UnitContent>{volumeUnit}</UnitContent>
              <div className="DirectionContainer">
                <button className="VolumeUp" onClick={() => handleChangeCancleVolume("Up")}>
                  &#8896;
                </button>
                <button className="VolumeDown" onClick={() => handleChangeCancleVolume("Down")}>
                  &#8897;
                </button>
              </div>
            </VolumeSettingBox>
          </div>
          <div className="totalContent">
            <span className="text">{totalCancleAmountText}</span>
            <span>
              {totalPrice} {priceUnit}
            </span>
          </div>
          <div className="ButtonContainer">
            <button className="cancel" onClick={setCancle}>
              {closeButtonText}
            </button>
            <button className="confirm" onClick={handleDeleteWaitOrder}>
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </CancelConfirm>
  );
};

// type 정의
interface OrderdStockProps {
  orderType: string;
  orderPrice: number;
  orderVolume: number;
  companyId: number;
  orderId: number;
  recordType: boolean;
}

interface CancelConfirmProps {
  orderType: string;
  orderPrice: number;
  orderVolume: number;
  companyId: number;
  orderId: number;
  corpName: string;
  setCancle: () => void;
}

interface companyProps {
  code: string;
  companyId: number;
  korName: string;
  stockAsBiResponseDto: null;
  stockInfResponseDto: null;
}

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

const StockContainer = styled.div<{ orderType: string }>`
  width: 100%;
  height: 48px;
  padding-right: 16px;
  padding-bottom: 16px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2px;

  .logoContainer {
    flex: 1 0 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 4px;

    .corpLogo {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }

  .tradingOverview {
    flex: 7 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2px;

    .corpName {
      font-size: 14px;
      font-weight: 500;
    }

    .orderInfo {
      display: flex;
      flex-direction: row;
      gap: 4px;
      font-size: 12px;

      .orderType {
        padding-left: 0.3px;
        padding-right: 2px;
        color: ${(props) => (props.orderType === "매도" ? "#2679ed" : "#e22926")};
      }

      .price,
      .volume {
        color: darkgray;
      }
    }
  }

  .orderRusultContainer {
    flex: 1.4 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 1px;

    & div {
      width: max-content;
      font-size: 11px;
      padding-left: 6px;
      padding-right: 6px;
    }

    .orderResult {
      color: ${(props) => (props.orderType === "매도" ? "#2679ed" : "#e22926")};
    }
  }

  .buttonContainer {
    flex: 1.4 0 0;
    height: 100%;
    display: flex;
    align-items: center;

    .cancelButton {
      font-size: 11px;
      padding-left: 6px;
      padding-right: 6px;
      height: 24px;
      border: none;
      border-radius: 0.2rem;
      color: ${(props) => (props.orderType === "매도" ? "#4479c2" : "#cc3c3a")};
      background-color: ${(props) => (props.orderType === "매도" ? "#c7dbfa" : "#f4d2cf")};
    }
  }
`;

const CancelConfirm = styled.div<{ orderType: string }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  .Container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width: 328px;
    height: 375px;
    background-color: white;
    border: none;
    border-radius: 0.5rem;

    padding-left: 20px;
    padding-right: 20px;

    .CorpLogo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .OrderOverview {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 6px;
      font-size: 18px;
      font-weight: 500;
      padding-top: 18px;
      padding-bottom: 28px;

      .OrderType {
        color: ${(props) => (props.orderType === "매도" ? "#4479c2" : "#cc3c3a")};
      }
    }

    .OrderContent {
      width: 100%;
      font-size: 15px;

      .priceContent {
        height: 24px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 40px;
      }

      .volumeContent {
        display: flex;
        flex-direction: column;
        padding-bottom: 20px;
        border-bottom: 0.1px solid #d3cece99;
      }

      .totalContent {
        height: 24px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 20px;
        padding-bottom: 20px;
      }

      .text {
        color: #292828;
      }

      .cancleVolumeText {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .maximumVolumeNum {
        color: ${(props) => (props.orderType === "매수" ? "#e22926" : "#2679ed")};
      }

      .TotalOrderAmout {
        padding-top: 20px;
        padding-bottom: 45px;
      }
    }

    .ButtonContainer {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 20px;
      gap: 12px;

      & button {
        width: 50%;
        height: 32px;
        border: none;
        border-radius: 0.25rem;
      }

      .cancel {
        color: ${(props) => (props.orderType === "매수" ? "#e22926" : "#2679ed")};
        background-color: ${(props) => (props.orderType === "매수" ? "#fcdddb" : "#dce9fc")};
      }

      .confirm {
        color: white;
        background-color: ${(props) => (props.orderType === "매수" ? "#e22926" : "#2679ed")};
      }
    }
  }
`;

const VolumeSettingBox = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;

  .DirectionContainer {
    display: flex;
    flex-direction: column;

    & button {
      width: 31px;
      height: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 10px;
      border: 1px solid darkgray;
      border-radius: 0%;

      &.VolumeUp {
        border-bottom: none;
        border-radius: 0 0.2rem 0 0;
      }

      &.VolumeDown {
        border-radius: 0 0 0.2rem 0;
      }
    }
  }
`;

const VolumeController = styled.input`
  flex: 1 0 0;
  height: 30px;
  border: 1px solid darkgray;
  border-right: none;
  border-radius: 0.2rem 0 0 0.2rem;
  font-size: 15px;
  font-weight: 500;
  text-align: right;
`;

const UnitContent = styled.div`
  height: 30px;
  color: #999999;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8px;
  border-top: 1px solid darkgray;
  border-bottom: 1px solid darkgray;
  background-color: #ffffff;
`;

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
