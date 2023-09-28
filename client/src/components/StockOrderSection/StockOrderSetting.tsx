import { useSelector, useDispatch } from "react-redux";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import { orderTypeBuying, orderTypeSelling } from "../../reducer/stockOrderType-Reducer";
import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";
import { OrderTypeProps } from "../../models/orderTypeProps";

import PriceSetting from "./PriceSetting";
import VolumeSetting from "./VolumeSetteing";
import OrderDecisionBtn from "./OrderDecisionBtn";

const orderType01: string = "매수";
const orderType02: string = "매도";

const StockOrderSetting = () => {
  const dispatch = useDispatch();
  const orderType = useSelector((state: StateProps) => state.stockOrderType);
  const companyId = useSelector((state: StateProps) => state.companyId);
  const { stockInfo, stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);

  if (stockInfoLoading) {
    return <></>;
  }

  if (stockInfoError) {
    return <></>;
  }

  const handleSetBuying = () => {
    dispatch(orderTypeBuying());
  };

  const handleSetSelling = () => {
    dispatch(orderTypeSelling());
  };

  return (
    <Container>
      <div className="OrderType">
        <Buying onClick={handleSetBuying} ordertype={orderType}>
          {orderType01}
        </Buying>
        <Selling onClick={handleSetSelling} ordertype={orderType}>
          {orderType02}
        </Selling>
      </div>
      <OrderTypeChangeEffetLine />
      <PriceSetting stockInfo={stockInfo.stockAsBiResponseDto} companyId={companyId} />
      <VolumeSetting />
      <OrderDecisionBtn />
    </Container>
  );
};

export default StockOrderSetting;

// 매수/매도 탭 전환 시 하단에 시각화 되는 선
const OrderTypeChangeEffetLine = () => {
  const orderType = useSelector((state: StateProps) => state.stockOrderType);

  return (
    <DividingContainer ordertype={orderType}>
      <DefaultLine ordertype={orderType}>
        <DivdingLine ordertype={orderType} />
      </DefaultLine>
    </DividingContainer>
  );
};

// component 생성
const Container = styled.div`
  width: 51%;
  height: 100%;

  .OrderType {
    width: 100%;
    height: 31px;
    display: flex;
    flex-direction: row;
    color: #9999;
  }
`;

const Buying = styled.div<OrderTypeProps>`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31px;
  font-size: 14px;
  color: ${(props) => !props.ordertype && "#e22926"};
  transition: color 0.5s;
`;

const Selling = styled.div<OrderTypeProps>`
  flex: 1 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 31px;
  font-size: 14px;
  color: ${(props) => props.ordertype && "#2679ed"};
  transition: color 0.5s;
`;

const DividingContainer = styled.div<OrderTypeProps>`
  background-color: darkgray;
`;

const DefaultLine = styled.div<OrderTypeProps>`
  transform: translateX(${(props) => (props.ordertype ? "50%" : "0")});
  transition: transform 0.3s ease-in-out;
  width: 100%;
  height: 2px;
`;

const DivdingLine = styled.div<OrderTypeProps>`
  width: 50%;
  height: 2px;
  background-color: ${(props) => (props.ordertype ? "#2679ed" : "#e22926")};
`;
