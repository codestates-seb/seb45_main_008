import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setStockOrderPrice } from "../../reducer/StockOrderPrice-Reducer";
import { StateProps } from "../../models/stateProps";

// dummyData
import { upperPriceVolumeSum, lowerPriceVolumeSum } from "./dummyData";

const StockPrice = (props: StockPriceProps) => {
  const { index, price, changeRate, volume } = props;

  const changeRateText01: string = changeRate > 0 ? "+" : "";
  const changeRateText02: string = "%";

  // 11번째 StockPrice 지정 (index === 10)
  const ref = useRef<HTMLDivElement | null>(null);

  // 최초 렌더링 시, 11번째 StockPrice 화면 정중앙에 위치하도록 설정
  useEffect(() => {
    ref.current?.focus();
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  const dispatch = useDispatch();
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);

  const handleSetOrderPrice = () => {
    dispatch(setStockOrderPrice(price));
  };

  return (
    <Container index={index} ref={index === 10 ? ref : null} price={price} orderPrice={orderPrice} onClick={handleSetOrderPrice}>
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
    </Container>
  );
};

export default StockPrice;

// type 지정
interface StockPriceProps {
  index: number;
  price: number;
  changeRate: number;
  volume: number;
}

// component 생성
const Container = styled.div<{ index: number; price: number; orderPrice: number }>`
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

const VolumePercentge = styled.span<{ index: number; volume: number; upperPriceVolumeSum: number; lowerPriceVolumeSum: number }>`
  width: ${(props) => (props.volume / (props.index < 10 ? props.upperPriceVolumeSum : props.lowerPriceVolumeSum)) * 100}%;
  height: 2px;
  background-color: ${(props) => (props.index < 10 ? "#2679ed" : "#e22926")};
`;
