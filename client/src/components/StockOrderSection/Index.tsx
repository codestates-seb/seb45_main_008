import { styled } from "styled-components";

import UpperBar from "./UpperBar";
import StockName from "./StockName";
import OrderRequest from "./OrderRequest";
import OrderResult from "./OrderResult";

const StockOrderSection = () => {
  return (
    <Container>
      <UpperBar />
      <StockName />
      <OrderRequest />
      <OrderResult />
    </Container>
  );
};

export default StockOrderSection;

const Container = styled.aside`
  position: fixed;
  right: 0px;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  width: 26%;
  min-width: 400px;
  height: 100%;
  background-color: #ffffff;
`;
