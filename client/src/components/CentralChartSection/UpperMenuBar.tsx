import { styled } from "styled-components";

import ExpandScreenBtn from "./UpperMenu-ExpandScreenBtn";
import StockInfoOverview from "./UpperMenu-StockInfoOverview";

const UpperMenuBar = () => {
  return (
    <Container>
      <FirstLine>
        <ExpandScreenBtn direction="left" />
        <StockInfoOverview />
        <ExpandScreenBtn direction="right" />
      </FirstLine>
      <SecondLine>second</SecondLine>
    </Container>
  );
};

export default UpperMenuBar;

const Container = styled.div`
  width: 100%;
  text-align: center;
`;

const FirstLine = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid darkgray;
`;

const SecondLine = styled.div`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid darkgray;
`;
