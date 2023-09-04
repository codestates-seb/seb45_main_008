import { styled } from "styled-components";
import StockPrice from "./StockPrice";

// dummyData
import { dummyPrice } from "./dummyData";

const StockPriceList = () => {
  return (
    <Container>
      <HighFigure>
        <div className="price"></div>
        <div className="volume"></div>
      </HighFigure>
      <PriceList>
        {dummyPrice.map((item, idx) => (
          <StockPrice key={item.price} index={idx} price={item.price} changeRate={item.changeRate} volume={item.volume} />
        ))}
      </PriceList>
      <LowerFigure>
        <div className="price"></div>
        <div className="volume"></div>
      </LowerFigure>
    </Container>
  );
};

export default StockPriceList;

// component 생성
const Container = styled.div`
  width: 40%;
  height: 100%;
  margin-right: 16px;
`;

const HighFigure = styled.div`
  width: 100%;
  height: 32px;
  border-bottom: 1px solid black;
`;

const PriceList = styled.ul`
  width: 100%;
  height: 348px;
  padding: 0px;
  border-bottom: 1px solid black;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const LowerFigure = styled.div`
  width: 100%;
  height: 32px;
`;
