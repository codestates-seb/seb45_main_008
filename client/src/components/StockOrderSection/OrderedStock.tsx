import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import useGetCompanyList from "../../hooks/useGetCompanyList";
import CancelConfirm from "./CancelConfirm";
import { dummyLogo } from "../../dummy/dummyLogo";
import { priceUnit, volumeUnit } from "../../constant/constant";

const cancelButtonText: string = "주문취소";

const OrderedStock = (props: OrderdStockProps) => {
  const { index, orderType, orderPrice, orderVolume, orderTime, companyId, orderId, recordType } = props;

  const { companyList } = useGetCompanyList();
  const [orderCancle, setOrderCancle] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const price = orderPrice.toLocaleString();
  const volume = orderVolume.toLocaleString();
  const totalOrderPrice = (orderPrice * orderVolume).toLocaleString();

  const corp = companyList.filter((corp: CompanyProps) => corp.companyId === companyId);
  const corpName = corp[0].korName;
  const companyLogo = dummyLogo[companyId - 1];

  const handleSetOrderCancle = () => {
    setOrderCancle(!orderCancle);
  };

  useEffect(() => {
    if (index === 0 && ref.current) {
      ref.current.focus();
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [recordType]);

  return (
    <>
      <StockContainer orderType={orderType} ref={index === 0 ? ref : null}>
        <div className="logoContainer">
          <img className="corpLogo" src={companyLogo} alt="stock logo" />
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
            <div className="orderDate">{orderTime}</div>
          </div>
        ) : (
          <div className="buttonContainer">
            <button className="cancelButton" onClick={handleSetOrderCancle}>
              {cancelButtonText}
            </button>
          </div>
        )}
      </StockContainer>
      {orderCancle && <CancelConfirm corpName={corpName} orderType={orderType} orderPrice={orderPrice} orderVolume={orderVolume} companyId={companyId} orderId={orderId} setCancle={handleSetOrderCancle} />}
    </>
  );
};

export default OrderedStock;

// type 정의
interface OrderdStockProps {
  orderType: string;
  orderPrice: number;
  orderVolume: number;
  orderTime: string;
  companyId: number;
  orderId: number;
  recordType: boolean;
  index: number;
}

interface CompanyProps {
  code: string;
  companyId: number;
  korName: string;
  stockAsBiResponseDto: null;
  stockInfResponseDto: null;
}

// component 생성
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
