import { useSelector } from "react-redux";
import useGetStockInfo from "../../hooks/useGetStockInfo";

import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";

import StockPrice from "./StockPrice";

const StockPriceList = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const { stockInfo, stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);

  if (stockInfoLoading) {
    return <></>;
  }

  if (stockInfoError) {
    return <></>;
  }

  // 1) 당일 매도/매수호가 및 거래량
  const sellingPrice: PriceProps[] = [];
  const buyingPrice: PriceProps[] = [];

  for (let i = 1; i < 6; i++) {
    const sellingPriceProp = `askp${i}`; // 매도 호가
    const sellingVolumeProp = `askp_rsqn${i}`; // 해당 매도호가 거래량
    const buyingPriceProp = `bidp${i}`; // 매수 호가
    const buyingVolumeProp = `bidp_rsqn${i}`; // 해당 매수호가 거래량

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

  // 1) 매도/매수호가 종합  2) 매수/매도호가 거래량 종합
  const sellingAndBuyingPrice = [...sellingPrice, ...buyingPrice];
  const totalSellingVolume = sellingPrice.reduce((acc, cur) => {
    return (acc = acc + cur.volume);
  }, 0);
  const totalBuyingVolum = buyingPrice.reduce((acc, cur) => {
    return (acc = acc + cur.volume);
  }, 0);

  return (
    <Container>
      <HighFigure>
        <div className="price"></div>
        <div className="volume"></div>
      </HighFigure>
      <PriceList>
        {sellingAndBuyingPrice.map((item, idx) => (
          <StockPrice key={item.price} index={idx} price={item.price} volume={item.volume} totalSellingVolume={totalSellingVolume} totalBuyingVolum={totalBuyingVolum} />
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
