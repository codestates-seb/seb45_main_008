import { styled } from "styled-components";

import UpperBar from "./UpperBar";

const StockOrder = () => {
  return (
    <Container>
      <UpperBar />
    </Container>
  );
};

export default StockOrder;

const Container = styled.div`
  flex: 3.3 0 0;
  min-width: 400px;
  height: 100%;
  border-left: 1px solid #2f4f4f;
`;
