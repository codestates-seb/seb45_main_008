import { useSelector } from "react-redux";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";

import StockPrice from "./StockPrice";

// dummyData & 🔴 테스트
import { dummyPrice } from "./dummyData";

const StockPriceList = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const { data, isLoading, error } = useGetStockInfo(companyId);

  if (isLoading) {
    return;
  }

  if (error) {
    return;
  }

  // 주가 정보 fetching -> 매수/매도 호가 및 거래량 각각 구분하여 배열 생성
  // 🟢 추가적으로 필요한 정보 = 주가 변동률 + 🟢 해당 로직 외부로 빼서 처리하는 방법 고민
  // 주가 변동률 -> 전날 종가 대비 상승/하략률
  const sellingPrice: priceProps[] = [];
  const buyingPrice: priceProps[] = [];

  for (let i = 1; i < 6; i++) {
    const sellingPriceProp = `askp${i}`;
    const sellingVolumeProp = `askp_rsqn${i}`;
    const buyingPriceProp = `bidp${i}`;
    const buyingVolumeProp = `bidp_rsqn${i}`;

    const sellingInfo = {
      price: data.stockAsBiResponseDto[sellingPriceProp],
      volume: data.stockAsBiResponseDto[sellingVolumeProp],
    };

    const buyingInfo = {
      price: data.stockAsBiResponseDto[buyingPriceProp],
      volume: data.stockAsBiResponseDto[buyingVolumeProp],
    };

    sellingPrice.unshift(sellingInfo);
    buyingPrice.push(buyingInfo);
  }

  const testFun = () => {
    console.log(sellingPrice);
    console.log(buyingPrice);
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
interface priceProps {
  price: string;
  volume: string;
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
