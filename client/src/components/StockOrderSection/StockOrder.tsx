import { useSelector, useDispatch } from "react-redux";
// import { isHoliday } from "@hyunbinseo/holidays-kr";
import { setStockOrderVolume } from "../../reducer/StockOrderVolume-Reducer";
import { closeDecisionWindow } from "../../reducer/SetDecisionWindow-Reducer";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import { StateProps } from "../../models/stateProps";
import useTradeStock from "../../hooks/useTradeStock";

import StockPriceList from "./StockPriceList";
import StockOrderSetting from "./StockOrderSetting";

// dummyData
import dummyImg from "../../asset/CentralSectionMenu-dummyImg.png";

//import company logos
import kia from '../../asset/logos/기아.svg';
import dy from '../../asset/logos/디와이.jpeg';
import logosamsung from '../../asset/logos/삼성전자.svg';
import celltrion from '../../asset/logos/셀트리온.svg';
import ecopro from '../../asset/logos/에코프로.jpeg';
import ecoproBM from '../../asset/logos/에코프로비엠.svg';
import kakaoBank from '../../asset/logos/카카오뱅크.svg';
import kuckoo from '../../asset/logos/쿠쿠홀딩스.jpeg';
import hanse from '../../asset/logos/한세엠케이.jpeg';
import hyundai from '../../asset/logos/현대차.svg';
import KG from '../../asset/logos/KG케미칼.png';
import LGelec from '../../asset/logos/LG전자.svg';
import LGchem from '../../asset/logos/LG화학.svg';
import posco from '../../asset/logos/POSCO홀딩스.svg';

const orderFailureMessage01: string = "주문 실패";
const orderFailureMessage02: string = "주문 수량이 없습니다";
const orderFailureMessage03: string = "입력하신 가격이 올바르지 않습니다";
const orderFailureMessage04: string = "주문 가능한 시간이 아닙니다";
const openingTimeIndicator: string = "주문 가능 : 평일 오전 9시 ~ 오후 3시 30분";
const orderFailureButtonText: string = "확인";

const orderPriceText: string = "주문단가";
const orderVolumeText: string = "주문수량";
const totalOrderAmountText: string = "총 주문금액";
const priceUnit: string = "원";
const volumeUnit: string = "주";
const cancelButtonText: string = "취소";
const confirmButtonText: string = "확인";

const toastText: string = " 요청이 완료되었습니다";

const StockOrder = ({ corpName }: { corpName: string }) => {
  const dispatch = useDispatch();
  const orderType = useSelector((state: StateProps) => state.stockOrderType);
  const orderVolume = useSelector((state: StateProps) => state.stockOrderVolume);
  const orderPrice = useSelector((state: StateProps) => state.stockOrderPrice);
  const decisionWindow = useSelector((state: StateProps) => state.decisionWindow);

  const orderTypeText: string = !orderType ? "매수" : "매도";
  const price = orderPrice.toLocaleString();
  const volume = orderVolume.toLocaleString();
  const totalPrice = (orderPrice * orderVolume).toLocaleString();

  // 이미 import된 로고들을 바탕으로 logos 객체 생성
  const logos: { [key: string]: string } = {
      '삼성전자': logosamsung,
      'POSCO홀딩스': posco,
      '셀트리온': celltrion,
      '에코프로': ecopro,
      '에코프로비엠': ecoproBM,
      '디와이': dy,
      '쿠쿠홀딩스': kuckoo,
      '카카오뱅크': kakaoBank,
      '한세엠케이': hanse,
      'KG케미칼': KG,
      'LG화학': LGchem,
      '현대차': hyundai,
      'LG전자': LGelec,
      '기아': kia,
      };
      // 그리고 나서, 이 `logos` 객체를 사용하여 기업명에 따라 적절한 로고를 선택할 수 있습니다.
    const companyLogo = logos[corpName] || dummyImg; // 기본 로고를 대체로 사용

  const handleCloseDecisionWindow = () => {
    dispatch(closeDecisionWindow());
  };

  //🔴 주문 관련 테스트
  const orderRequest = useTradeStock();

  const handleOrderConfirm = () => {
    orderRequest.mutate();
    const { isLoading, isError } = orderRequest;

    if (isLoading) {
      console.log("주식 주문 진행 중");
    }

    if (isError) {
      console.log("주문 오류 발생");
    }

    toast(
      <ToastMessage orderType={orderType}>
        <div className="overview">
          <img src={companyLogo} alt="stock logo" />
          <div className="orderInfo">
            {corpName} {volume}
            {volumeUnit}
          </div>
        </div>
        <div>
          <span className="orderType">✓ {orderTypeText}</span>
          <span>{toastText}</span>
        </div>
      </ToastMessage>,
      {
        position: toast.POSITION.BOTTOM_LEFT,
        // autoClose: 2000,
        hideProgressBar: true,
      }
    );

    dispatch(setStockOrderVolume(0));
    handleCloseDecisionWindow();
  };

  // 1) 주말, 공휴일 여부 체크
  // const today = new Date();
  // const nonBusinessDay = isHoliday(today, { include: { saturday: true, sunday: true } }); // 토요일, 일요일, 공휴일 (임시 공휴일 포함)

  // 🟢 2) 개장시간 여부 체크
  // const currentHour = today.getHours();
  // const currentMinute = today.getMinutes();
  // const isBefore9AM = currentHour < 9;
  // const isAfter330PM = currentHour > 15 || (currentHour === 15 && currentMinute >= 30);
  // const closingTime = isBefore9AM || isAfter330PM;

  // 주문 실패 케이스 1) 개장시간  2) 가격/거래량 설정
  // 🔴 3시 30분 이후 작업 위해 closingTime 조건 해제 + 주말 요건도 해제
  const orderFailureCase01 = false;

  // 🟢 기존로직
  // const orderFailureCase01 = nonBusinessDay || closingTime;
  const orderFailureCase02 = orderPrice === 0 || orderVolume === 0;

  return (
    <>
      {/* 주문 버튼 클릭 안했을 때 */}
      <Container>
        <StockPriceList />
        <StockOrderSetting />
      </Container>

      {/* 주문 버튼 클릭 했을 때 */}
      {decisionWindow ? (
        orderFailureCase01 || orderFailureCase02 ? (
          <OrderFailed>
            <div className="Container">
              <div className="message01">{orderFailureCase01 ? `${orderFailureMessage04}` : orderFailureMessage01}</div>
              <div className="message02">{orderFailureCase01 ? `${openingTimeIndicator}` : orderPrice !== 0 ? `${orderFailureMessage02}` : `${orderFailureMessage03}`}</div>
              <button onClick={handleCloseDecisionWindow}>{orderFailureButtonText}</button>
            </div>
          </OrderFailed>
        ) : (
          <OrderConfirm orderType={orderType}>
            <div className="Container">
              <img className="CorpLogo" src={companyLogo} alt="stock logo" />
              <div className="OrderOverview">
                <span className="CorpName">{corpName}</span>
                <span className="OrderType">{orderTypeText}</span>
              </div>
              <div className="OrderContent">
                <div className="Price">
                  <span className="text">{orderPriceText}</span>
                  <span>
                    {price} {priceUnit}
                  </span>
                </div>
                <div className="Volume">
                  <span className="text">{orderVolumeText}</span>
                  <span>
                    {volume} {volumeUnit}
                  </span>
                </div>
                <div className="TotalOrderAmout">
                  <span className="text">{totalOrderAmountText}</span>
                  <span>
                    {totalPrice} {priceUnit}
                  </span>
                </div>
                <div className="ButtonContainer">
                  <button className="cancel" onClick={handleCloseDecisionWindow}>
                    {cancelButtonText}
                  </button>
                  <button className="confirm" onClick={handleOrderConfirm}>
                    {confirmButtonText}
                  </button>
                </div>
              </div>
            </div>
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
      font-size: 18.5px;
      font-weight: 500;
    }

    .message02 {
      font-size: 16.5px;
      font-weight: 400;
    }

    & button {
      width: 100%;
      height: 36px;
      border: none;
      border-radius: 0.5rem;
      font-size: 14.5px;
      color: white;
      background-color: #2f4f4f;
      margin-top: 12px;
    }
  }
`;

const OrderConfirm = styled.div<{ orderType: boolean }>`
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

    width: 328px;
    height: 345px;
    background-color: white;
    border: none;
    border-radius: 0.5rem;

    padding-left: 20px;
    padding-right: 20px;
    padding-top: 24px;

    .CorpLogo {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .OrderOverview {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 6px;
      font-size: 18px;
      font-weight: 500;
      padding-top: 18px;
      padding-bottom: 28px;

      .OrderType {
        color: ${(props) => (props.orderType ? "#2679ed" : "#e22926")};
      }
    }

    .OrderContent {
      width: 100%;
      font-size: 15px;

      & div {
        height: 24px;

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 40px;
      }

      .text {
        color: #292828;
      }

      .Volume {
        border-bottom: 0.1px solid #d3cece99;
      }

      .TotalOrderAmout {
        padding-top: 20px;
        padding-bottom: 45px;
      }
    }

    .ButtonContainer {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      padding-top: 20px;
      gap: 12px;

      & button {
        width: 50%;
        height: 32px;
        border: none;
        border-radius: 0.25rem;
      }

      .cancel {
        color: ${(props) => (!props.orderType ? "#e22926" : "#2679ed")};
        background-color: ${(props) => (!props.orderType ? "#fcdddb" : "#dce9fc")};
      }

      .confirm {
        color: white;
        background-color: ${(props) => (!props.orderType ? "#e22926" : "#2679ed")};
      }
    }
  }
`;

const ToastMessage = styled.div<{ orderType: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 7px;

  font-size: 14px;

  .overview {
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: 700;
    gap: 6px;
  }

  & img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    padding-bottom: 3px;
  }

  .orderType {
    color: ${(props) => (!props.orderType ? "#e22926" : "#2679ed")};
  }
`;
