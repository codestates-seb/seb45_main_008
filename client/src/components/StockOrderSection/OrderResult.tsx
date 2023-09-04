import { styled } from "styled-components";

const titleText: string = "주문내역";
const orderPendingTitle: string = "미체결";
const orderPendingEmptyMessage: string = "미체결 내역이 없습니다";

const OrderResult = () => {
  return (
    <Container>
      <div className="Title">{titleText}</div>
      <OrderPending>
        <div className="orderPendingTitle">{orderPendingTitle}</div>
        <div className="emptyIndicator">{orderPendingEmptyMessage}</div>
      </OrderPending>
    </Container>
  );
};

export default OrderResult;

const Container = styled.div`
  flex: 1 0 0;
  padding-top: 16px;
  display: flex;
  flex-direction: column;

  .Title {
    font-size: 16px;
    font-weight: 500;
    padding-left: 16px;
    padding-bottom: 16px;
  }
`;

const OrderPending = styled.div`
  .orderPendingTitle {
    padding-left: 16px;
    margin-bottom: 8px;
  }

  .emptyIndicator {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 350;
    color: #999999;
  }
`;
