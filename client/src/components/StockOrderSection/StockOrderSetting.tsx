import { styled } from "styled-components";

const orderType01: string = "매수";
const orderType02: string = "매도";

const StockOrderSetting = () => {
  return (
    <Container>
      <OrderType>
        <div className="buying">{orderType01}</div>
        <div className="selling">{orderType02}</div>
      </OrderType>
    </Container>
  );
};

export default StockOrderSetting;

const Container = styled.div`
  width: 208px;
  height: 100%;
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

const OrderType = styled.div`
  width: 100%;
  height: 32px;
  display: flex;
  flex-direction: row;

  & div {
    flex: 1 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 31px;
    font-size: 14px;
    border-bottom: 1px solid darkgray;
  }
`;
