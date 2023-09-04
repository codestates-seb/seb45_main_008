import { styled } from "styled-components";

import StockPriceList from "./StockPriceList";
import StockOrderSetting from "./StockOrderSetting";

const OrderRequest = () => {
  return (
    <Container>
      <StockPriceList />
      <StockOrderSetting />
    </Container>
  );
};

export default OrderRequest;

const Container = styled.div`
  height: 414px;
  border-bottom: 1px solid black;

  display: flex;
  flex-direction: row;
`;
