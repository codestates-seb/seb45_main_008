import { styled } from "styled-components";
import PriceSetting from "./PriceSetting";
import VolumeSetting from "./VolumeSetteing";
import StockOrderBtn from "./StockOrderBtn";

const orderType01: string = "매수";
const orderType02: string = "매도";

const StockOrderSetting = () => {
  return (
    <Container>
      <OrderType>
        <div className="buying">{orderType01}</div>
        <div className="selling">{orderType02}</div>
      </OrderType>
      <PriceSetting />
      <VolumeSetting />
      <StockOrderBtn />
    </Container>
  );
};

export default StockOrderSetting;

const Container = styled.div`
  width: 51%;
  height: 100%;
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
