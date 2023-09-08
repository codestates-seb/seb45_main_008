import { useSelector } from "react-redux";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import useGetStockData from "../../hooks/useGetStockData";
import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";
import { StockProps } from "../../models/stockProps";

import StockPrice from "./StockPrice";

// dummyData
import { dummyPrice } from "./dummyData";

const StockPriceList = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const { stockInfo, stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);
  const { stockPrice, stockPriceLoading, stockPriceError } = useGetStockData(companyId);

  if (stockInfoLoading || stockPriceLoading) {
    return <></>;
  }

  if (stockInfoError || stockPriceError) {
    return <></>;
  }

  // 당일 매수/매도 호가 정리
  const sellingPrice: PriceProps[] = [];
  const buyingPrice: PriceProps[] = [];
  let previousDayStockClosingPrice: number = 0;

  for (let i = 1; i < 6; i++) {
    const sellingPriceProp = `askp${i}`;
    const sellingVolumeProp = `askp_rsqn${i}`;
    const buyingPriceProp = `bidp${i}`;
    const buyingVolumeProp = `bidp_rsqn${i}`;

    const sellingInfo = {
      price: parseInt(stockInfo.stockAsBiResponseDto[sellingPriceProp]),
      volume: parseInt(stockInfo.stockAsBiResponseDto[sellingVolumeProp]),
    };

    const buyingInfo = {
      price: parseInt(stockInfo.stockAsBiResponseDto[buyingPriceProp]),
      volume: parseInt(stockInfo.stockAsBiResponseDto[buyingVolumeProp]),
    };

    sellingPrice.unshift(sellingInfo);
    buyingPrice.push(buyingInfo);
  }

  // 전날 종가 데이터 -> 1) 일/월 : 금요일 종가로 설정  2) 화~토 : 전날 종가로 설정
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

  const testFun = () => {
    console.log(sellingPrice);
    console.log(buyingPrice);

    console.log(sellingPrice[0].price);
    console.log(previousDayStockClosingPrice);

    console.log(sellingPrice[0].price - previousDayStockClosingPrice);
  };

  testFun();

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

// type 정의
interface PriceProps {
  price: number;
  volume: number;
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

const LowerFigure = styled.div`
  width: 100%;
  height: 32px;
`;
