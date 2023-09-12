import { useSelector } from "react-redux";
import useGetStockInfo from "../../hooks/useGetStockInfo";

import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";

import StockPrice from "./StockPrice";

const StockPriceList = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const stockOrderType = useSelector((state: StateProps) => state.stockOrderType);
  const { stockInfo, stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);

  if (stockInfoLoading) {
    return;
  }

  if (stockInfoError) {
    return;
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

  /*
  🔴 삭제 예정인 코드
  [문제점] 주가 리스트 개수가 너무 적음 (매도호가 5개 + 매수호가 5개 = 총 10개) → UX를 저해하는 요소로 판단되어, 더미데이터를 추가 (매도/매수 각각 5개씩)
  [해결방안] 1) fetching 해온 데이터 중 가격 0인 데이터 제외 (한국투자증권 API에서 간혹 보내는 경우 있음) → 호가 간격 계산 후, 더미 데이터 추가 (거래량은 0으로 설정)
  */
  const existSellingPrice = sellingPrice.filter((selling) => selling.price !== 0);
  const existBuyingPrice = buyingPrice.filter((buyingPrice) => buyingPrice.price !== 0);
  // const priceInterval: number = existSellingPrice[existSellingPrice.length - 1].price - existBuyingPrice[0].price;

  // for (let i = 0; existSellingPrice.length < 10; i++) {
  //   const dummySellingData = { price: existSellingPrice[0].price + priceInterval, volume: 0 };
  //   existSellingPrice.unshift(dummySellingData);
  // }

  // for (let i = 0; existBuyingPrice.length < 10; i++) {
  //   const dummyBuyingData = { price: existBuyingPrice[existBuyingPrice.length - 1].price - priceInterval, volume: 0 };
  //   existBuyingPrice.push(dummyBuyingData);
  // }

  // 1) 매도/매수호가 종합  2) 매수/매도호가 거래량 종합
  const sellingAndBuyingPrice = [...existSellingPrice, ...existBuyingPrice];
  const totalSellingVolume = existSellingPrice.reduce((acc, cur) => {
    return (acc = acc + cur.volume);
  }, 0);
  const totalBuyingVolum = existBuyingPrice.reduce((acc, cur) => {
    return (acc = acc + cur.volume);
  }, 0);

  return (
    <Container orderType={stockOrderType}>
      <div className="priceIndicator">
        <div className="sellingPrice">매도호가</div>
        <div className="sellingVolume">거래량</div>
      </div>
      <PriceList>
        {sellingAndBuyingPrice.map((item, idx) => (
          <StockPrice key={item.price} index={idx} price={item.price} volume={item.volume} totalSellingVolume={totalSellingVolume} totalBuyingVolum={totalBuyingVolum} />
        ))}
      </PriceList>
      <div className="priceIndicator">
        <div className="buyingPrice">매수호가</div>
        <div className="buyingVolume">거래량</div>
      </div>
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
const Container = styled.div<{ orderType: boolean }>`
  width: 40%;
  height: 100%;
  margin-right: 16px;

  .priceIndicator {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 32px;
    font-size: 13px;
    padding-left: 15px;

    & div {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .sellingPrice,
    .sellingVolume {
      color: ${(props) => (props.orderType ? "#9999" : "#e22926")};
    }

    .buyingPrice,
    .buyingVolume {
      color: ${(props) => (props.orderType ? "#2679ed" : "#9999")};
    }
  }
`;

const PriceList = styled.ul`
  width: 100%;
  height: 348px;
  padding: 0px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
