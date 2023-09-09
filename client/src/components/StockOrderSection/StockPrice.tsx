import useGetStockData from "../../hooks/useGetStockData";
import { StockProps } from "../../models/stockProps";

import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setStockOrderPrice } from "../../reducer/StockOrderPrice-Reducer";
import { StateProps } from "../../models/stateProps";

const StockPrice = (props: StockPriceProps) => {
  const { index, price, volume, totalSellingVolume, totalBuyingVolum } = props;

  const companyId = useSelector((state: StateProps) => state.companyId);
  const { stockPrice, stockPriceLoading, stockPriceError } = useGetStockData(companyId);

  const dispatch = useDispatch();
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleSetOrderPrice = () => {
    dispatch(setStockOrderPrice(price));
  };

  // 가격 리스트 중 10번째 순서인 요소가 화면 렌더링 시 정중앙에 오도록 설정
  useEffect(() => {
    if (!stockPriceLoading && !stockPriceError) {
      ref.current?.focus();
      ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [stockPrice]);

  if (stockPriceLoading) {
    return <></>;
  }

  if (stockPriceError) {
    return <></>;
  }

  // 전날 종가 데이터 -> 1) 일/월 : 금요일 종가로 설정  2) 화~토 : 전날 종가로 설정
  let previousDayStockClosingPrice: number;

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const getToday = new Date().getDay();
  const today = daysOfWeek[getToday];

  if (today === "일" || today === "월") {
    previousDayStockClosingPrice = stockPrice[stockPrice.length - 1].stck_prpr;
  } else {
    const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
    const yesterdayYymmdd = yesterday.toISOString().slice(0, 10);

    const yesterdayStockInfo = stockPrice.filter((stockInfo: StockProps) => {
      const dayInfo = stockInfo.stockTradeTime.slice(0, 10);

      if (dayInfo === yesterdayYymmdd) {
        return stockInfo;
      }
    });

    previousDayStockClosingPrice = parseInt(yesterdayStockInfo[yesterdayStockInfo.length - 1].stck_prpr);
  }

  // 전날 종가대비 매도/매수호가 변동률
  const changeRate = `${(((price - previousDayStockClosingPrice) / previousDayStockClosingPrice) * 100).toFixed(2)}%`;

  return (
    <Container index={index} ref={index === 9 ? ref : null} price={price} orderPrice={orderPrice} onClick={handleSetOrderPrice}>
      <Price>
        <div className="price">{price.toLocaleString()}</div>
        <div className="changeRate">{changeRate}</div>
      </Price>
      <Volume index={index}>
        <div className="volume">{volume.toLocaleString()}</div>
        <VolumePercentge index={index} volume={volume} upperPriceVolumeSum={totalSellingVolume} lowerPriceVolumeSum={totalBuyingVolum} />
      </Volume>
    </Container>
  );
};

export default StockPrice;

// 전체 매도/도수 거래량 대비 개별가격 매도/매수 거래량 비율
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
  totalSellingVolume: number;
  totalBuyingVolum: number;
}

// component 생성
const Container = styled.div<{ index: number; price: number; orderPrice: number }>`
  width: 100%;
  height: 36px;
  margin-bottom: 2px;
  background-color: ${(props) => (props.index > 9 ? "#FDE8E7" : "#E7F0FD")};
  border: ${(props) => (props.price === props.orderPrice ? "1.5px solid #2F4F4F" : "none")};
  border-left: ${(props) => (props.price === props.orderPrice ? "3px solid red" : props.index > 9 ? "3px solid #FDE8E7" : "3px solid #E7F0FD")};
  display: flex;
  flex-direction: row;
  transition: border 1s ease;

  &:hover {
    cursor: pointer;
  }
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

const StockVolumePercentge = styled.span<{ index: number; volume: number; upperPriceVolumeSum: number; lowerPriceVolumeSum: number }>`
  height: 2px;
  background-color: ${(props) => (props.index < 10 ? "#2679ed" : "#e22926")};
  transition: width 0.5s ease;
`;
