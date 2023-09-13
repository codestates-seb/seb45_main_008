import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import useGetCash from "../../hooks/useGetCash";
import { StateProps } from "../../models/stateProps";
import { OrderTypeProps } from "../../models/orderTypeProps";
import { setStockOrderVolume } from "../../reducer/StockOrderVolume-Reducer";
import { openDecisionWindow } from "../../reducer/SetDecisionWindow-Reducer";

const availableMoneyText01: string = "최대";
const availableMoneyText02: string = "원";
const totalAmountText: string = "주문총액";
const totalAmountUnit: string = "원";

const OrderDecisionBtn = () => {
  const { cashData } = useGetCash();
  const cash = cashData.toLocaleString();

  const dispatch = useDispatch();
  const orderType = useSelector((state: StateProps) => state.stockOrderType);
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);
  const orderVolume = useSelector((state: StateProps) => state.stockOrderVolume);
  const [totalOrderAmout, setTotalOrderAmout] = useState(0);

  const orderBtnText: string = orderType ? "매도" : "매수";

  const handleOpenDecisionWindow = () => {
    dispatch(openDecisionWindow());
  };

  useEffect(() => {
    setTotalOrderAmout(orderPrice * orderVolume);
  }, [orderPrice, orderVolume]);

  useEffect(() => {
    dispatch(setStockOrderVolume(0));
    setTotalOrderAmout(0);
  }, [orderType]);

  return (
    <div className="container">
      <AvailableMoney orderType={orderType}>
        <span>{availableMoneyText01}</span>
        <span className="availableMoney">{cash}</span>
        <span>{availableMoneyText02}</span>
      </AvailableMoney>
      <TotalAmount>
        <div className="totalAmountText">{totalAmountText}</div>
        <div className="totalAmount">{totalOrderAmout.toLocaleString()}</div>
        <div>{totalAmountUnit}</div>
      </TotalAmount>
      <OrderBtn ordertype={orderType} onClick={handleOpenDecisionWindow}>
        {orderBtnText}
      </OrderBtn>
    </div>
  );
};

export default OrderDecisionBtn;

// component 생성
const AvailableMoney = styled.div<{ orderType: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 4px;

  & span {
    font-size: 14px;
    color: ${(props) => (props.orderType ? "white" : "#999999")};
  }

  .availableMoney {
    color: ${(props) => (props.orderType ? "white" : "#ed2926")};
  }
`;

const TotalAmount = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 4px;
  gap: 4px;

  & div {
    font-size: 13px;
    color: #999999;
    display: flex;
    align-items: center;
  }

  .totalAmountText {
    flex: 8 0 0;
  }

  .totalAmount {
    color: black;
    font-size: 15.5px;
  }
`;

const OrderBtn = styled.button<OrderTypeProps>`
  width: 100%;
  height: 32px;
  margin-top: 16px;
  border: none;
  border-radius: 0.25rem;
  background-color: ${(props) => (props.ordertype ? "#2679ed" : "#e22926")};
  transition: background-color 0.5s;
  color: #ffffff;
  font-weight: 400;
`;
