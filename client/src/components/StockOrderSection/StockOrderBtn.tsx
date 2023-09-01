import { styled } from "styled-components";

const availableMoneyText01: string = "최대";
const availableMoneyText02: string = "원";
const totalAmountText01: string = "주문총액";
const totalAmountText02: string = "원";
const orderBtnText: string = "매수";

// dummyData
const dummyMoney: string = "9,990,086";
const dummyAmount: string = "0";

const StockOrderBtn = () => {
  return (
    <Container>
      <AvailableMoney>
        <span>{availableMoneyText01}</span>
        <span className="availableMoney">{dummyMoney}</span>
        <span>{availableMoneyText02}</span>
      </AvailableMoney>
      <TotalAmount>
        <div className="totalAmountText01">{totalAmountText01}</div>
        <div className="totalAmount">{dummyAmount}</div>
        <div>{totalAmountText02}</div>
      </TotalAmount>
      <OrderBtn>{orderBtnText}</OrderBtn>
    </Container>
  );
};

export default StockOrderBtn;

const Container = styled.div``;

const AvailableMoney = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 4px;

  & span {
    font-size: 14px;
    color: #999999;
  }

  .availableMoney {
    color: #ed2926;
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

const OrderBtn = styled.button`
  width: 100%;
  height: 32px;
  margin-top: 16px;
  border: none;
  border-radius: 0.25rem;
  background-color: #ed2926;
  color: #ffffff;
  font-weight: 400;
`;
