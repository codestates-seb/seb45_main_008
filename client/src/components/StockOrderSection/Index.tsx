import { styled } from "styled-components";

import StockName from "./StockName";
import OrderRequest from "./OrderRequest";
import OrderResult from "./OrderResult";

const titleText: string = "주식주문";

const StockOrderSection = () => {
  return (
    <Container>
      <UpperBar>
        <Title>{titleText}</Title>
        <CloseBtn>&#10005;</CloseBtn>
      </UpperBar>
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

const UpperBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 43px;
  border-bottom: 1px solid black;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 450;
  color: #1c1c1c;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  width: 28px;
  height: 95%;
  border: none;
  font-size: 20px;
  color: #525252;
  background-color: #ffff;
`;
