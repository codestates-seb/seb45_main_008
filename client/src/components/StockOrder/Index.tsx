import { styled } from "styled-components";

import UpperBar from "./UpperBar";
import StockName from "./StockName";

const StockOrder = () => {
  return (
    <Container>
      <UpperBar />
      <StockName />
    </Container>
  );
};

export default StockOrder;

const Container = styled.aside`
  position: fixed;
  right: 0px;
  transition: right 0.3s ease-in-out;

  flex: 3.3 0 0;
  min-width: 400px;
  height: 100%;
  border-left: 1px solid #2f4f4f;
`;
