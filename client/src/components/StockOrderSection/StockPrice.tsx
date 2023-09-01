import { styled } from "styled-components";

const StockPrice = () => {
  return (
    <Container>
      <HighFigure></HighFigure>
      <PriceInfo></PriceInfo>
      <LowerFigure></LowerFigure>
    </Container>
  );
};

export default StockPrice;

const Container = styled.div`
  width: 40%;
  height: 100%;
  margin-right: 16px;
  border-right: 1px solid black;
`;

const HighFigure = styled.div`
  width: 100%;
  height: 32px;
  border-bottom: 1px solid black;
`;

const PriceInfo = styled.div`
  width: 100%;
  height: 348px;
  border-bottom: 1px solid black;
`;

const LowerFigure = styled.div`
  width: 100%;
  height: 32px;
`;
