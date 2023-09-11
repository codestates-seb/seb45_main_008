import { useSelector, useDispatch } from "react-redux";
import { closeDecisionWindow } from "../../reducer/SetDecisionWindow-Reducer";
import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";

import StockPriceList from "./StockPriceList";
import StockOrderSetting from "./StockOrderSetting";

const orderFailureMessage01: string = "주문 실패";
const orderFailureMessage02: string = "주문 수량이 없습니다";
const orderFailureButtonText: string = "확인";

const StockOrder = () => {
  const dispatch = useDispatch();
  const decisionWindow = useSelector((state: StateProps) => state.decisionWindow);
  const orderVolume = useSelector((state: StateProps) => state.stockOrderVolume);

  const handleCloseDecisionWindow = () => {
    dispatch(closeDecisionWindow());
  };

  return (
    <>
      {/* 주문 버튼 클릭 안했을 때 */}
      <Container>
        <StockPriceList />
        <StockOrderSetting />
      </Container>

      {/* 주문 버튼 클릭 했을 때 */}
      {decisionWindow ? (
        orderVolume === 0 ? (
          <OrderFailed>
            <div className="Container">
              <div className="message01">{orderFailureMessage01}</div>
              <div className="message02">{orderFailureMessage02}</div>
              <button onClick={handleCloseDecisionWindow}>{orderFailureButtonText}</button>
            </div>
          </OrderFailed>
        ) : (
          <OrderConfirm>
            <button onClick={handleCloseDecisionWindow}>임시버튼</button>
          </OrderConfirm>
        )
      ) : (
        <></>
      )}
    </>
  );
};

export default StockOrder;

const Container = styled.div`
  height: 414px;

  display: flex;
  flex-direction: row;
`;

const OrderFailed = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;

  .Container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;

    width: 360px;
    height: 148px;
    padding: 16px;
    background-color: white;
    border-radius: 0.5rem;

    .message01 {
      font-size: 20px;
    }

    .message02 {
      font-size: 18px;
    }

    & button {
      width: 100%;
      height: 36px;
      border: none;
      border-radius: 0.5rem;
      color: white;
      background-color: #2f4f4f;
      margin-top: 12px;
    }
  }
`;

const OrderConfirm = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
