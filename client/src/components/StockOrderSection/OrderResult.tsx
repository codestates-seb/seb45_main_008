import { styled } from "styled-components";
import useGetStockOrderRecord from "../../hooks/useGetStockOrderRecord";
import useGetCompanyList from "../../hooks/useGetCompanyList";
import useDeleteStockOrder from "../../hooks/useDeleteStockOrder";
import { orderWaitProps } from "../../models/stockProps";

// dummyLogo
import dummyImg from "../../asset/CentralSectionMenu-dummyImg.png";

const priceUnit: string = "원";
const volumeUnit: string = "주";
const cancelButtonText: string = "주문취소";

const titleText: string = "미체결 내역";
const orderPendingEmptyMessage: string = "미체결 내역이 없습니다";
const layoutComposition: string = "StockHolm";

const OrderResult = () => {
  const { orderRecordData } = useGetStockOrderRecord();

  const orderWaitList = orderRecordData.filter((order: orderWaitProps) => order.orderStates === "ORDER_WAIT");
  orderWaitList.reverse(); // 최근 주문이 상단에 노출되도록 배열 순서 변경
  const waitListNum = orderWaitList.length;

  console.log(waitListNum);

  return (
    <Container>
      <div className="Title">{titleText}</div>
      <TradeWaiting>
        {waitListNum === 0 ? (
          <div className="emptyIndicator">{orderPendingEmptyMessage}</div>
        ) : (
          <div className="orderWaitStockList">
            {orderWaitList.map((stock: orderWaitProps) => {
              const orderType = stock.orderTypes === "BUY" ? "매수" : "매도";
              const price = stock.price.toLocaleString();
              const volume = stock.stockCount.toLocaleString();
              const companyId = stock.companyId;
              const orderId = stock.stockOrderId;

              return <OrderWaitStock key={orderId} orderType={orderType} price={price} volume={volume} companyId={companyId} orderId={orderId} />;
            })}
            <div className="layoutComposition">{layoutComposition}</div>
          </div>
        )}
      </TradeWaiting>
    </Container>
  );
};

export default OrderResult;

const OrderWaitStock = (props: WaitStockProps) => {
  const { orderType, price, volume, companyId, orderId } = props;
  const { companyList } = useGetCompanyList();
  const deleteOrder = useDeleteStockOrder();

  const corp = companyList.filter((corp: companyProps) => corp.companyId === companyId);
  const corpName = corp[0].korName;

  const handleDeleteWaitOrder = () => {
    deleteOrder.mutate(orderId);
    const { isLoading, isError } = deleteOrder;

    if (isLoading) {
      console.log("주문 삭제 처리 중");
    }

    if (isError) {
      console.log("주문 삭제 실패");
    }
  };

  return (
    <StockContainer orderType={orderType}>
      <div className="logoContainer">
        <img className="corpLogo" src={dummyImg} />
      </div>
      <div className="tradingOverview">
        <div className="corpName">{corpName}</div>
        <div className="orderInfo">
          <span className="orderType">{orderType}</span>
          <span className="price">
            {price}
            {priceUnit}
          </span>
          <span className="volume">
            {volume}
            {volumeUnit}
          </span>
        </div>
      </div>
      <div className="buttonContainer">
        <button className="cancelButton" onClick={handleDeleteWaitOrder}>
          {cancelButtonText}
        </button>
      </div>
    </StockContainer>
  );
};

// type 정의
interface WaitStockProps {
  orderType: string;
  price: string;
  volume: string;
  companyId: number;
  orderId: number;
}

interface companyProps {
  code: string;
  companyId: number;
  korName: string;
  stockAsBiResponseDto: null;
  stockInfResponseDto: null;
}

// component 생성
const Container = styled.div`
  height: auto;
  max-height: 100%;
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

const TradeWaiting = styled.div`
  .title {
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

  .layoutComposition {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 350;
    color: white;
  }
`;

const StockContainer = styled.div<{ orderType: string }>`
  width: 100%;
  height: 48px;
  padding-right: 16px;
  padding-bottom: 16px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2px;

  .logoContainer {
    flex: 1 0 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 4px;

    .corpLogo {
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }
  }

  .tradingOverview {
    flex: 7 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 2px;

    .corpName {
      font-size: 14px;
      font-weight: 500;
    }

    .orderInfo {
      display: flex;
      flex-direction: row;
      gap: 4px;
      font-size: 12px;

      .orderType {
        padding-left: 0.3px;
        padding-right: 2px;
        color: ${(props) => (props.orderType === "매도" ? "#2679ed" : "#e22926")};
      }

      .price,
      .volume {
        color: darkgray;
      }
    }
  }

  .buttonContainer {
    flex: 1.4 0 0;
    height: 100%;
    display: flex;
    align-items: center;

    .cancelButton {
      font-size: 11px;
      padding-left: 6px;
      padding-right: 6px;
      height: 24px;
      border: none;
      border-radius: 0.2rem;
      color: ${(props) => (props.orderType === "매도" ? "#4479c2" : "#cc3c3a")};
      background-color: ${(props) => (props.orderType === "매도" ? "#c7dbfa" : "#f4d2cf")};
    }
  }
`;
