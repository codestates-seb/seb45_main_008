import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setStockOrderPrice, plusStockOrderPrice, minusStockOrderPrice } from "../../reducer/StockOrderPrice-Reducer";
import { StateProps } from "../../models/stateProps";
import { StockInfoProps } from "../../models/stockInfoProps";
import { priceUnit } from "../../constant/constant";

const priceSettingTitle: string = "가격";
const noVolumeNotification: string = " [거래량 없음] 주문 시 대기 처리 됩니다";
const existVolumeNotification: string = " [거래량 있음] 주문 시 체결 처리 됩니다";

const PriceSetting = (props: OwnProps) => {
  const { stockInfo, companyId } = props;

  const dispatch = useDispatch();
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);
  const orderType = useSelector((state: StateProps) => state.stockOrderType);
  const [orderPossibility, setOrderPossibility] = useState(true);
  const [priceChangeTimer, setPriceChangeTimer] = useState<NodeJS.Timeout | null>(null);

  // 매도/매수호가 정리
  const { askp1, askp2, askp3, askp4, askp5, askp6, askp7, askp8, askp9, askp10 } = stockInfo;
  const { bidp1, bidp2, bidp3, bidp4, bidp5, bidp6, bidp7, bidp8, bidp9, bidp10 } = stockInfo;
  const sellingPrice = [askp1, askp2, askp3, askp4, askp5, askp6, askp7, askp8, askp9, askp10].map((price) => parseInt(price));
  const buyingPrice = [bidp1, bidp2, bidp3, bidp4, bidp5, bidp6, bidp7, bidp8, bidp9, bidp10].map((price) => parseInt(price));
  const existSellingPrice = sellingPrice.filter((price) => price !== 0);
  const existBuyingPrice = buyingPrice.filter((price) => price !== 0);

  // 호가 간 가격 차
  const priceInterval = existSellingPrice[1] - existSellingPrice[0];

  // 거래가 변경 시
  const handlePlusOrderPrice = () => {
    dispatch(plusStockOrderPrice(priceInterval));
  };

  const handleMinusOrderPrice = () => {
    dispatch(minusStockOrderPrice(priceInterval));
  };

  const handleInputArrowBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "ArrowUp") {
      handlePlusOrderPrice();
    } else if (event.code === "ArrowDown") {
      handleMinusOrderPrice();
    }
  };

  const handleWriteOrderPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPrice = event.target.value;
    const numberInputPrice = parseInt(inputPrice, 10);

    // 1) 음수를 임력하거나, 숫자 아닌 값 기입 시 -> 입력 무시  2) 값을 다 지워서 빈 문자열인 경우 -> 0으로 설정
    if (numberInputPrice < 0 || isNaN(numberInputPrice)) {
      if (inputPrice === "") {
        dispatch(setStockOrderPrice(0));
      }
      return;
    }

    // priceInterval로 나누어 떨어지지 않는 값을 기입 시 -> 0.8초 후에 나누어 떨어지는 값으로 변경
    if (priceChangeTimer !== null) {
      clearTimeout(priceChangeTimer); // 이전 입력으로 인한 비동기 작업 존재할 시 -> 제거
    }

    dispatch(setStockOrderPrice(numberInputPrice));

    if (numberInputPrice > priceInterval && numberInputPrice % priceInterval !== 0) {
      const newTimer = setTimeout(() => {
        const remainder = numberInputPrice % priceInterval;
        const modifiedInputValue = numberInputPrice - remainder;
        dispatch(setStockOrderPrice(modifiedInputValue));
      }, 800);

      setPriceChangeTimer(newTimer);
    }
  };

  // 거래 가능여부 판별 함수 (거래량 유무에 따라)
  const handleCheckTradePossibility = () => {
    if (orderType) {
      // 매수
      if (orderPrice !== 0 && !existBuyingPrice.includes(orderPrice)) {
        setOrderPossibility(false);
      } else {
        setOrderPossibility(true);
      }
    }

    if (!orderType) {
      // 메도
      if (orderPrice !== 0 && !existSellingPrice.includes(orderPrice)) {
        setOrderPossibility(false);
      } else {
        setOrderPossibility(true);
      }
    }
  };

  useEffect(() => {
    handleCheckTradePossibility();
  }, [orderPrice, orderType]);

  useEffect(() => {
    dispatch(setStockOrderPrice(existSellingPrice[0]));
  }, [companyId]);

  return (
    <Container>
      <div className="PriceCategoryBox">
        <div className="Title">{priceSettingTitle}</div>
      </div>
      <div className="PriceSettingBox">
        <PriceController defaultValue={orderPrice} value={orderPrice} onChange={handleWriteOrderPrice} onKeyDown={handleInputArrowBtn} onFocus={handleCheckTradePossibility} />
        <UnitContent>{priceUnit}</UnitContent>
        <div className="DirectionBox">
          <button className="PriceUp" onClick={handlePlusOrderPrice}>
            &#8896;
          </button>
          <button className="PriceDown" onClick={handleMinusOrderPrice}>
            &#8897;
          </button>
        </div>
      </div>
      <CheckTradingVolume orderPossibility={orderPossibility}>
        <div>&#10004; {orderPossibility ? `${existVolumeNotification}` : `${noVolumeNotification}`}</div>
      </CheckTradingVolume>
    </Container>
  );
};

export default PriceSetting;

interface OwnProps {
  stockInfo: StockInfoProps;
  companyId: number;
}

// component 생성
const Container = styled.div`
  position: relative;
  width: 100%;
  margin-top: 21px;
  margin-bottom: 34px;

  .PriceCategoryBox {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 8px;

    .Title {
      padding-left: 5px;
      font-size: 13px;
      color: #999999;
    }

    .ButtonContainer {
      position: relative;
      width: 100px;
      height: 25px;
      background-color: #f2f2f2;
      border-radius: 0.3rem;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 2px;
    }
  }

  .PriceSettingBox {
    display: flex;
    flex-direction: row;

    .DirectionBox {
      display: flex;
      flex-direction: column;

      & button {
        width: 31px;
        height: 15px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 10px;
        border: 1px solid darkgray;
        border-radius: 0%;

        &.PriceUp {
          border-bottom: none;
          border-radius: 0 0.2rem 0 0;
        }

        &.PriceDown {
          border-radius: 0 0 0.2rem 0;
        }
      }
    }
  }
`;

const PriceController = styled.input`
  flex: 1 0 0;
  height: 30px;
  border: 1px solid darkgray;
  border-right: none;
  border-radius: 0.2rem 0 0 0.2rem;
  font-size: 15px;
  font-weight: 500;
  text-align: right;
  padding-bottom: 3px;
`;

const UnitContent = styled.div`
  height: 30px;
  color: #999999;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 8px;
  border-top: 1px solid darkgray;
  border-bottom: 1px solid darkgray;
  background-color: #ffffff;
`;

const CheckTradingVolume = styled.div<{ orderPossibility: boolean }>`
  position: absolute;
  top: 61px;
  left: 2px;
  font-size: 0.77em;
  color: ${(props) => (props.orderPossibility ? "#2679ed" : "#e22926")};
  transition: color 0.3s ease-in-out;
`;
