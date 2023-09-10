import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import { setStockOrderPrice, plusStockOrderPrice, minusStockOrderPrice } from "../../reducer/StockOrderPrice-Reducer";
import { StateProps } from "../../models/stateProps";
import { StockInfoprops } from "../../models/stockInfoProps";
import { number } from "echarts";

const priceSettingTitle: string = "가격";
const unitText: string = "원";

const PriceSetting = (props: OwnProps) => {
  const { stockInfo, companyId } = props;

  const dispatch = useDispatch();
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);

  // 초기 설정값 및 가격 변동폭 설정
  const { askp1, askp2, askp3, askp4, askp5 } = stockInfo;
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

  // 거래가 직접 기입 시  1) 음수 => 0으로 재설정  2) priceInteval로 나누어 떨어지지 않으면 => 나누어 떨어지는 수로 변경
  const handleWriteOrderPrice = (event: React.ChangeEvent<HTMLInputElement>) => {

    const inputValue = event.target.value;
    const numberInputValue = parseInt(inputValue, 10);

    if(inputValue === ''){
      dispatch(setStockOrderPrice(0));
    }

    

    if(event.target.value !== ''){
    const inputValue = parseInt(event.target.value, 10);
    dispatch(setStockOrderPrice(inputValue));
    }

    // if(inputValue < 0) {
    //   dispatch(setStockOrderPrice(0));
    // }

    // if(inputValue % priceInterval !== 0){
    //   const remainder = inputValue % priceInterval;
    //   const modifiedInputValue = inputValue - remainder;
    //   dispatch(setStockOrderPrice(modifiedInputValue));
    // }
  }

  // 종목이 달리지면 -> 가격도 변경
  useEffect(() => {
    dispatch(setStockOrderPrice(defaultPrice));
  }, [companyId]);

  // 입력 값 -> event 속성에 담겨 있음
  // onChange 이벤트 발생할 때 -> 해당 입력값을 Price 관련 전역 상태로 (전역 상태 관리함수 활용)
  // set => 으로 actionPayload를 설정해야하는데,,, 
  // payload에 넘기기 전에 1) 0보다 큰 값인지, 2) PriceInterval로 나누어 떨어지는지 => 안된다면 
  // 전역 상태관리 함수를 2번 사용? 1) 일단 입력값으로 바꾸고 2) 2차로 필터링 해서 바꾸고?  
  // 2차 변경 때 -> 음수면 0으로 바꾸고,,, Iterval이랑 안맞으면 -> Interval로 나눈 나머지 값 차감

  return (
    <Container>
      <div className="PriceCategoryBox">
        <div className="Title">{priceSettingTitle}</div>
      </div>
      <div className="PriceSettingBox">
        <PriceController defaultValue={orderPrice} value={orderPrice} onChange={handleWriteOrderPrice}/>
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
