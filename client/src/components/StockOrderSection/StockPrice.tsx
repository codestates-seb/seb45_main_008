import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setStockOrderPrice } from "../../reducer/StockOrderPrice-Reducer";
import { StateProps } from "../../models/stateProps";

const changeRateUnit = `%`;

const StockPrice = (props: StockPriceProps) => {
  const { index, price, volume, changeRate, totalSellingVolume, totalBuyingVolum } = props;

  const dispatch = useDispatch();
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSetOrderPrice = () => {
    dispatch(setStockOrderPrice(price));
  };

  useEffect(() => {
    if (index === 9 && ref.current) {
      ref.current.focus();
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [ref.current]);

  return (
    <Container index={index} ref={index === 9 ? ref : null} price={price} orderPrice={orderPrice} onClick={handleSetOrderPrice}>
      <Price changeRate={parseFloat(changeRate)}>
        <div className="price">{price.toLocaleString()}</div>
        <div className="changeRate">
          {changeRate}
          {changeRateUnit}
        </div>
      </Price>
      <Volume index={index}>
        <div className="volume">{volume.toLocaleString()}</div>
        <VolumePercentge index={index} volume={volume} upperPriceVolumeSum={totalSellingVolume} lowerPriceVolumeSum={totalBuyingVolum} />
      </Volume>
    </Container>
  );
};

export default StockPrice;

// 전체 거래량 대비 개별가격 거래량 비율
const VolumePercentge = (props: { index: number; volume: number; upperPriceVolumeSum: number; lowerPriceVolumeSum: number }) => {
  const { index, volume, upperPriceVolumeSum, lowerPriceVolumeSum } = props;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth((volume / (index < 10 ? upperPriceVolumeSum : lowerPriceVolumeSum)) * 100);
  }, [volume]);

  return <StockVolumePercentge index={index} volume={volume} upperPriceVolumeSum={upperPriceVolumeSum} lowerPriceVolumeSum={lowerPriceVolumeSum} style={{ width: `${width}%` }} />;
};

// type 지정
interface StockPriceProps {
  index: number;
  price: number;
  volume: number;
  changeRate: string;
  totalSellingVolume: number;
  totalBuyingVolum: number;
}

// component 생성
const Container = styled.div<{ index: number; price: number; orderPrice: number }>`
  width: 100%;
  height: 36px;
  margin-bottom: 2px;
  background-color: ${(props) => (props.price === props.orderPrice ? (props.index > 9 ? "#e9c2bf" : "#bed1eb") : props.index > 9 ? "#FDE8E7" : "#E7F0FD")};
  border-left: ${(props) => (props.price === props.orderPrice ? "3px solid red" : props.index > 9 ? "3px solid #FDE8E7" : "3px solid #E7F0FD")};
  display: flex;
  flex-direction: row;
  transition: border 0.8s ease, background-color 0.8s ease;

  &:hover {
    cursor: pointer;
  }
`;

const Price = styled.div<{ changeRate: number }>`
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
    color: ${(props) => (props.changeRate > 0 ? "#ed2926" : props.changeRate === 0 ? "black" : "#3177d7")};
    padding-top: 1px;
  }
`;

const Volume = styled.div<{ index: number }>`
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

const StockVolumePercentge = styled.span<{ index: number; volume: number; upperPriceVolumeSum: number; lowerPriceVolumeSum: number }>`
  height: 2px;
  background-color: ${(props) => (props.index < 10 ? "#2679ed" : "#e22926")};
  transition: width 0.5s ease;
`;
