import { useState, useEffect, useRef } from "react";
import { styled } from "styled-components";
import useGetCompanyList from "../../hooks/useGetCompanyList";
import CancelConfirm from "./CancleConfirm";

// dummyLogo
import dummyImg from "../../asset/CentralSectionMenu-dummyImg.png";

//기업로고 import
import kia from "../../asset/logos/기아.svg";
import dy from "../../asset/logos/디와이.jpeg";
import logosamsung from "../../asset/logos/삼성전자.svg";
import celltrion from "../../asset/logos/셀트리온.svg";
import ecopro from "../../asset/logos/에코프로.jpeg";
import ecoproBM from "../../asset/logos/에코프로비엠.svg";
import kakaoBank from "../../asset/logos/카카오뱅크.svg";
import kuckoo from "../../asset/logos/쿠쿠홀딩스.jpeg";
import hanse from "../../asset/logos/한세엠케이.jpeg";
import hyundai from "../../asset/logos/현대차.svg";
import KG from "../../asset/logos/KG케미칼.png";
import LGelec from "../../asset/logos/LG전자.svg";
import LGchem from "../../asset/logos/LG화학.svg";
import posco from "../../asset/logos/POSCO홀딩스.svg";

const priceUnit: string = "원";
const volumeUnit: string = "주";
const cancelButtonText: string = "주문취소";

// 개별 거래내역
const OrderedStock = (props: OrderdStockProps) => {
  const { index, orderType, orderPrice, orderVolume, orderTime, companyId, orderId, recordType } = props;

  const { companyList } = useGetCompanyList();
  const [orderCancle, setOrderCancle] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const price = orderPrice.toLocaleString();
  const volume = orderVolume.toLocaleString();
  const totalOrderPrice = (orderPrice * orderVolume).toLocaleString();

  const corp = companyList.filter((corp: CompanyProps) => corp.companyId === companyId);
  const corpName = corp[0].korName;

  // 이미 import된 로고들을 바탕으로 logos 객체 생성
  const logos: { [key: string]: string } = {
    삼성전자: logosamsung,
    POSCO홀딩스: posco,
    셀트리온: celltrion,
    에코프로: ecopro,
    에코프로비엠: ecoproBM,
    디와이: dy,
    쿠쿠홀딩스: kuckoo,
    카카오뱅크: kakaoBank,
    한세엠케이: hanse,
    KG케미칼: KG,
    LG화학: LGchem,
    현대차: hyundai,
    LG전자: LGelec,
    기아: kia,
  };

  // 그리고 나서, 이 `logos` 객체를 사용하여 기업명에 따라 적절한 로고를 선택할 수 있습니다.
  const companyLogo = logos[corpName] || dummyImg; // 기본 로고를 대체로 사용

  const handleSetOrderCancle = () => {
    setOrderCancle(!orderCancle);
  };

  useEffect(() => {
    if (index === 0 && ref.current) {
      ref.current.focus();
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [recordType]);

  return (
    <>
      <StockContainer orderType={orderType} ref={index === 0 ? ref : null}>
        <div className="logoContainer">
          <img className="corpLogo" src={companyLogo} alt="stock logo" />
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
        {recordType ? (
          <div className="orderRusultContainer">
            <div className="orderResult">
              <span className="totalPrice">{totalOrderPrice}</span>
              <span className="priceUnit">{priceUnit}</span>
            </div>
            <div className="orderDate">{orderTime}</div>
          </div>
        ) : (
          <div className="buttonContainer">
            <button className="cancelButton" onClick={handleSetOrderCancle}>
              {cancelButtonText}
            </button>
          </div>
        )}
      </StockContainer>
      {orderCancle && <CancelConfirm corpName={corpName} orderType={orderType} orderPrice={orderPrice} orderVolume={orderVolume} companyId={companyId} orderId={orderId} setCancle={handleSetOrderCancle} />}
    </>
  );
};

export default OrderedStock;

// type 정의
interface OrderdStockProps {
  orderType: string;
  orderPrice: number;
  orderVolume: number;
  orderTime: string;
  companyId: number;
  orderId: number;
  recordType: boolean;
  index: number;
}

interface CompanyProps {
  code: string;
  companyId: number;
  korName: string;
  stockAsBiResponseDto: null;
  stockInfResponseDto: null;
}

// component 생성
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

  .orderRusultContainer {
    flex: 1.4 0 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    gap: 1px;

    & div {
      width: max-content;
      font-size: 11px;
      padding-left: 6px;
      padding-right: 6px;
    }

    .orderResult {
      color: ${(props) => (props.orderType === "매도" ? "#2679ed" : "#e22926")};
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
