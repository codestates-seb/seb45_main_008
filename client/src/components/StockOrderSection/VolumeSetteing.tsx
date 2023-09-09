import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";
import { setStockOrderVolume, plusStockOrderVolume, minusStockOrderVolume } from "../../reducer/StockOrderVolume-Reducer";

const volumeSettingTitle: string = "수량";
const maximumVolumeText01: string = "최대";
const volumeUnit: string = "주";

const volumPercentage01: number = 10;
const volumPercentage02: number = 25;
const volumPercentage03: number = 50;
const volumPercentage04: number = 100;
const percentageUnit: string = "%";

// dummyData
const dummyMoney: number = 10000000;
const dummyholdingStock = 10;

const VolumeSetting = () => {
  const dispatch = useDispatch();
  const orderType = useSelector((state: StateProps) => state.stockOrderType);
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);
  const orderVolume = useSelector((state: StateProps) => state.stockOrderVolume);

  const maximumBuyingVolume = Math.trunc(dummyMoney / orderPrice);

  const handlePlusOrderVolume = () => {
    // 매수 -> 증가 버튼 클릭 시, 최대 구매수량 보다 낮으면 개수 1증가
    if (!orderType) {
      orderVolume < maximumBuyingVolume && dispatch(plusStockOrderVolume());
    }
    // 매도 -> 증가 버튼 클릭 시, 보유 주식수량 보다 낮으면 개수 1증가
    if (orderType) {
      orderVolume < dummyholdingStock && dispatch(plusStockOrderVolume());
    }
  };

  const handleMinusOrderVolume = () => {
    if (0 < orderVolume) {
      // setOrderVolume((previousState: number) => previousState - 1);
      dispatch(minusStockOrderVolume());
    }
  };

  const handleSetVolumePercentage = (volumePerentage: number) => {
    // 매수 -> percentage 버튼 클릭 시, 최대 구매수량 내에서 계산
    if (!orderType) {
      const orderVolume = Math.trunc(maximumBuyingVolume * (volumePerentage / 100));
      dispatch(setStockOrderVolume(orderVolume));
    }

    // 매도 -> percentage 버튼 클릭 시, 보유 주식수량 내에서 계산
    if (orderType) {
      const orderVolume = Math.trunc(dummyholdingStock * (volumePerentage / 100));
      dispatch(setStockOrderVolume(orderVolume));
    }
  };

  // 지정가 증가 -> (현재 주문수량 > 최대 주문가능 수량)일 경우 -> 현재 주문수량을 최대 주문수량으로 변경
  useEffect(() => {
    if (maximumBuyingVolume < orderVolume) {
      dispatch(setStockOrderVolume(maximumBuyingVolume));
    }
  }, [maximumBuyingVolume]);

  return (
    <Container>
      <TitleContainer orderType={orderType}>
        <div className="Title">{volumeSettingTitle}</div>
        <div className="MaximumVolumeContainer">
          <span>{maximumVolumeText01}</span>
          <span className="maximumVolume">{orderType ? dummyholdingStock : maximumBuyingVolume}</span>
          <span>{volumeUnit}</span>
        </div>
      </TitleContainer>
      <VolumeSettingBox>
        <VolumeController defaultValue={orderVolume} value={orderVolume} />
        <UnitContent>{volumeUnit}</UnitContent>
        <div className="DirectionContainer">
          <button className="VolumeUp" onClick={handlePlusOrderVolume}>
            &#8896;
          </button>
          <button className="VolumeDown" onClick={handleMinusOrderVolume}>
            &#8897;
          </button>
        </div>
      </VolumeSettingBox>
      <PercentageBox>
        <button onClick={() => handleSetVolumePercentage(volumPercentage01)}>
          {volumPercentage01}
          {percentageUnit}
        </button>
        <button onClick={() => handleSetVolumePercentage(volumPercentage02)}>
          {volumPercentage02}
          {percentageUnit}
        </button>
        <button onClick={() => handleSetVolumePercentage(volumPercentage03)}>
          {volumPercentage03}
          {percentageUnit}
        </button>
        <button onClick={() => handleSetVolumePercentage(volumPercentage04)}>
          {volumPercentage04}
          {percentageUnit}
        </button>
      </PercentageBox>
    </Container>
  );
};

export default VolumeSetting;

// component 생성
const Container = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 56px;
`;

const TitleContainer = styled.div<{ orderType: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;

  .Title {
    padding-left: 5px;
    font-size: 13px;
    color: #999999;
  }

  .MaximumVolumeContainer {
    display: flex;
    flex-direction: row;
    gap: 3px;

    & span {
      font-size: 14px;
      color: #999999;
    }

    .maximumVolume {
      color: ${(props) => (props.orderType ? "#3177d7" : "#ed2926")};
    }
  }
`;

const VolumeSettingBox = styled.div`
  display: flex;
  flex-direction: row;

  .DirectionContainer {
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

      &.VolumeUp {
        border-bottom: none;
        border-radius: 0 0.2rem 0 0;
      }

      &.VolumeDown {
        border-radius: 0 0 0.2rem 0;
      }
    }
  }
`;

const VolumeController = styled.input`
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

const PercentageBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
  gap: 8px;

  & button {
    width: 56px;
    height: 28px;
    border: none;
    border-radius: 0.2rem;
  }
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
