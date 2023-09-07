import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";
import { OrderTypeProps } from "../../models/orderTypeProps";

const availableMoneyText01: string = "최대";
const availableMoneyText02: string = "원";
const totalAmountText01: string = "주문총액";
const totalAmountText02: string = "원";

// dummyData
import { availableMoney } from "./dummyData";
const dummyAmount: string = "0";
const dummyMoney = availableMoney.toLocaleString();

const StockOrderBtn = () => {
  const stockOrderType = useSelector((state: StateProps) => state.stockOrderType);
  const orderBtnText: string = stockOrderType ? "매도" : "매수";

  return (
    <Container>
      <AvailableMoney orderType={stockOrderType}>
        <span>{availableMoneyText01}</span>
        <span className="availableMoney">{dummyMoney}</span>
        <span>{availableMoneyText02}</span>
      </AvailableMoney>
      <TotalAmount>
        <div className="totalAmountText01">{totalAmountText01}</div>
        <div className="totalAmount">{dummyAmount}</div>
        <div>{totalAmountText02}</div>
      </TotalAmount>
      <OrderBtn ordertype={stockOrderType}>{orderBtnText}</OrderBtn>
    </Container>
  );
};

export default StockOrderBtn;

const Container = styled.div``;

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

  .totalAmountText01 {
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
