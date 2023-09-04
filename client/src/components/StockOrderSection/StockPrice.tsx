import { useSelector, useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { styled } from "styled-components";
import { setStockOrderPrice } from "../../reducer/StockOrderPrice-Reducer";
import { StateProps } from "../../models/stateProps";

// dummyData
import { dummyPrice } from "./dummyData";
import { upperPriceVolumeSum, lowerPriceVolumeSum } from "./dummyData";

const StockPrice = () => {
  return (
    <Container>
      <HighFigure>
        <div className="price"></div>
        <div className="volume"></div>
      </HighFigure>
      <PriceList>
        {dummyPrice.map((item, idx) => (
          <PriceInfo key={item.price} index={idx} price={item.price} changeRate={item.changeRate} volume={item.volume} />
        ))}
      </PriceList>
      <LowerFigure>
        <div className="price"></div>
        <div className="volume"></div>
      </LowerFigure>
    </Container>
  );
};

export default StockPrice;

const PriceInfo = (props: PriceInfoProps) => {
  const { index, price, changeRate, volume } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  const stockOrderPrice = useSelector((state: StateProps) => state.stockOrderPrice);
  const dispatch = useDispatch();
  const handleSetOrderPrice = () => {
    dispatch(setStockOrderPrice(price));
  };

  const changeRateText01: string = changeRate > 0 ? "+" : "";
  const changeRateText02: string = "%";

  // 11번째 가격 -> 렌더링 시 정중앙에 위치하도록
  useEffect(() => {
    ref.current?.focus();
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  if (index === 10) {
    return (
      <InfoContainer index={index} ref={ref} price={price} orderPrice={stockOrderPrice} onClick={handleSetOrderPrice}>
        <Price>
          <div className="price">{price}</div>
          <div className="changeRate">
            {changeRateText01}
            {changeRate}
            {changeRateText02}
          </div>
        </Price>
        <Volume index={index}>
          <div className="volume">{volume}</div>
          <VolumePercentge index={index} volume={volume} upperPriceVolumeSum={upperPriceVolumeSum} lowerPriceVolumeSum={lowerPriceVolumeSum} />
        </Volume>
      </InfoContainer>
    );
  }

  return (
    <InfoContainer index={index} price={price} orderPrice={stockOrderPrice} onClick={handleSetOrderPrice}>
      <Price>
        <div className="price">{price}</div>
        <div className="changeRate">
          {changeRateText01}
          {changeRate}
          {changeRateText02}
        </div>
      </Price>
      <Volume index={index}>
        <div className="volume">{volume}</div>
        <VolumePercentge index={index} volume={volume} upperPriceVolumeSum={upperPriceVolumeSum} lowerPriceVolumeSum={lowerPriceVolumeSum} />
      </Volume>
    </InfoContainer>
  );
};

// type 지정
interface PriceInfoProps {
  index: number;
  price: number;
  changeRate: number;
  volume: number;
}

interface InfoContainerProps {
  index: number;
  price: number;
  orderPrice: number;
}

interface VolumeProps {
  index: number;
}

interface VolumePercentageProps {
  index: number;
  volume: number;
  upperPriceVolumeSum: number;
  lowerPriceVolumeSum: number;
}

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

const InfoContainer = styled.div<InfoContainerProps>`
  width: 100%;
  height: 36px;
  margin-bottom: 2px;
  background-color: ${(props) => (props.index > 9 ? "#FDE8E7" : "#E7F0FD")};
  border: ${(props) => (props.index === 10 ? "1px solid #2F4F4F" : "none")};
  border-left: ${(props) => (props.price === props.orderPrice ? "3px solid red" : props.index > 9 ? "3px solid #FDE8E7" : "3px solid #E7F0FD")};
  display: flex;
  flex-direction: row;
`;

const Price = styled.div`
  width: 50%;
  display: flex;
  padding-right: 11px;
  flex-direction: column;
  align-items: flex-end;

  .price {
    font-size: 14px;
    font-weight: 400;
    padding-top: 1px;
  }

  .changeRate {
    font-size: 12px;
    font-weight: 400;
    color: #e22926;
    padding-top: 1px;
  }
`;

const Volume = styled.div<VolumeProps>`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 12px;
  color: ${(props) => (props.index < 10 ? "#2679ed" : "#e22926")};

  .volume {
    height: 100%;
    display: flex;
    align-items: center;
    padding-right: 8px;
  }
`;

const VolumePercentge = styled.span<VolumePercentageProps>`
  width: ${(props) => (props.volume / (props.index < 10 ? props.upperPriceVolumeSum : props.lowerPriceVolumeSum)) * 100}%;

  height: 2px;
  background-color: ${(props) => (props.index < 10 ? "#2679ed" : "#e22926")};
`;

const LowerFigure = styled.div`
  width: 100%;
  height: 32px;
`;
