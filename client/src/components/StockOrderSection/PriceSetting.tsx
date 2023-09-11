import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setStockOrderPrice, plusStockOrderPrice, minusStockOrderPrice } from "../../reducer/StockOrderPrice-Reducer";
import { StateProps } from "../../models/stateProps";
import { StockInfoprops } from "../../models/stockInfoProps";

const priceSettingTitle: string = "가격";
const unitText: string = "원";

const PriceSetting = (props: OwnProps) => {
  const { stockInfo, companyId } = props;

  const dispatch = useDispatch();
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);

  // 초기 설정값 및 가격 변동폭 설정
  const { askp1, askp2, askp3, askp4, askp5 } = stockInfo;
  const [priceChangeTimer, setPriceChangeTimer] = useState<NodeJS.Timeout | null>(null);
  const sellingPrice = [parseInt(askp1), parseInt(askp2), parseInt(askp3), parseInt(askp4), parseInt(askp5)];
  const existSellingPrice = sellingPrice.filter((price) => price !== 0); // price 0인 경우 제거
  const defaultPrice = existSellingPrice[0];
  const priceInterval = existSellingPrice[1] - existSellingPrice[0];

  // 거래가 증가/감소
  const handlePlusOrderPrice = () => {
    dispatch(plusStockOrderPrice(priceInterval));
  };

  const handleMinusOrderPrice = () => {
    dispatch(minusStockOrderPrice(priceInterval));
  };

  // 방향키 입력 시
  const handleInputArrowBtn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === "ArrowUp") {
      handlePlusOrderPrice();
    } else if (event.code === "ArrowDown") {
      handleMinusOrderPrice();
    }
  };

  // 거래가 직접 기입 시
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
      clearTimeout(priceChangeTimer);
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

  // 종목이 달리지면 -> 가격도 변경
  useEffect(() => {
    dispatch(setStockOrderPrice(defaultPrice));
  }, [companyId]);

  return (
    <Container>
      <div className="PriceCategoryBox">
        <div className="Title">{priceSettingTitle}</div>
      </div>
      <div className="PriceSettingBox">
        <PriceController defaultValue={orderPrice} value={orderPrice} onChange={handleWriteOrderPrice} onKeyDown={handleInputArrowBtn} />
        <UnitContent>{unitText}</UnitContent>
        <div className="DirectionBox">
          <button className="PriceUp" onClick={handlePlusOrderPrice}>
            &#8896;
          </button>
          <button className="PriceDown" onClick={handleMinusOrderPrice}>
            &#8897;
          </button>
        </div>
      </div>
    </Container>
  );
};

export default PriceSetting;

interface OwnProps {
  stockInfo: StockInfoprops;
  companyId: number;
}

// component 생성
const Container = styled.div`
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
