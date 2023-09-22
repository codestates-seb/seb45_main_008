import { useState } from "react";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import useDeleteStockOrder from "../../hooks/useDeleteStockOrder";

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

// 주문 취소 확인창
const CancelConfirm = (props: CancelConfirmProps) => {
  const { corpName, orderType, orderPrice, orderVolume, orderId, setCancle } = props;

  const [cancleVolume, setCancleVolume] = useState(0);
  const deleteOrder = useDeleteStockOrder();

  const orderCancleText: string = "취소";
  const orderPriceText: string = "주문단가";
  const cancleVolumeText: string = "취소수량";
  const maximumCancleVolumeText01: string = "최대";
  const maximumCancleVolumeText02: string = "주";
  const totalCancleAmountText: string = "총 취소금액";
  const closeButtonText: string = "닫기";
  const confirmButtonText: string = "확인";
  const toastText01: string = "취소";
  const toastText02: string = " 처리가 완료되었습니다";
  const price = orderPrice.toLocaleString();
  const totalPrice = (orderPrice * cancleVolume).toLocaleString();

  const handleChangeCancleVolume = (direction: string) => {
    if (direction === "Up") {
      cancleVolume < orderVolume && setCancleVolume((previousState) => previousState + 1);
    }
    if (direction === "Down") {
      0 < cancleVolume && setCancleVolume((previousState) => previousState - 1);
    }
  };

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

  // 거래량 직접 기입 시
  const handleWriteCancleVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const numberInputValue = parseInt(inputValue, 10);

    // 1) 음수를 임력하거나, 숫자 아닌 값 기입 시 -> 입력 무시  2) 값을 다 지워서 빈 문자열인 경우 -> 0으로 설정  3) 취소가능 수량 보다 높게 기입 -> 입력 무시
    if (numberInputValue < 0 || isNaN(numberInputValue)) {
      if (inputValue === "") {
        setCancleVolume(0);
      }
      return;
    }

    if (orderVolume < numberInputValue) {
      return;
    } else {
      setCancleVolume(numberInputValue);
    }
  };

  const handleDeleteWaitOrder = () => {
    deleteOrder.mutate({ orderId, cancleVolume });
    const { isLoading, isError } = deleteOrder;

    if (isLoading) {
      console.log("주문 삭제 처리 중");
    }

    if (isError) {
      console.log("주문 삭제 실패");
    }

    toast(
      <ToastMessage orderType={orderType}>
        <div className="overview">
          <img src={companyLogo} alt="stock logo" />
          <div className="orderInfo">
            {corpName} {cancleVolume}
            {volumeUnit}
          </div>
        </div>
        <div>
          <span className="orderType">
            ✓ {orderType}
            {toastText01}
          </span>
          <span>{toastText02}</span>
        </div>
      </ToastMessage>,
      {
        position: toast.POSITION.BOTTOM_LEFT,
        // autoClose: 2000,
        hideProgressBar: true,
      }
    );

    setCancle(); // 모달 창 닫기
  };

  return (
    <Container orderType={orderType}>
      <div className="Container">
        <img className="CorpLogo" src={dummyImg} />
        <div className="OrderOverview">
          <span className="CorpName">{corpName}</span>
          <span className="OrderType">{orderType}</span>
          <span className="orderCancel">{orderCancleText}</span>
        </div>
        <div className="OrderContent">
          <div className="priceContent">
            <span className="text">{orderPriceText}</span>
            <span>
              {price} {priceUnit}
            </span>
          </div>
          <div className="volumeContent">
            <div className="text cancleVolumeText">
              <span>{cancleVolumeText}</span>
              <span className="maximumCancleVolume">
                {maximumCancleVolumeText01}
                <span className="maximumVolumeNum"> {orderVolume} </span>
                {maximumCancleVolumeText02}
              </span>
            </div>
            <VolumeSettingBox>
              <VolumeController defaultValue={cancleVolume} value={cancleVolume} onChange={handleWriteCancleVolume} />
              <UnitContent>{volumeUnit}</UnitContent>
              <div className="DirectionContainer">
                <button className="VolumeUp" onClick={() => handleChangeCancleVolume("Up")}>
                  &#8896;
                </button>
                <button className="VolumeDown" onClick={() => handleChangeCancleVolume("Down")}>
                  &#8897;
                </button>
              </div>
            </VolumeSettingBox>
          </div>
          <div className="totalContent">
            <span className="text">{totalCancleAmountText}</span>
            <span>
              {totalPrice} {priceUnit}
            </span>
          </div>
          <div className="ButtonContainer">
            <button className="cancel" onClick={setCancle}>
              {closeButtonText}
            </button>
            <button className="confirm" onClick={handleDeleteWaitOrder}>
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CancelConfirm;

// type 정의
interface CancelConfirmProps {
  orderType: string;
  orderPrice: number;
  orderVolume: number;
  companyId: number;
  orderId: number;
  corpName: string;
  setCancle: () => void;
}

// component 생성
const Container = styled.div<{ orderType: string }>`
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
    height: 375px;
    background-color: white;
    border: none;
    border-radius: 0.5rem;

    padding-left: 20px;
    padding-right: 20px;

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
        color: ${(props) => (props.orderType === "매도" ? "#4479c2" : "#cc3c3a")};
      }
    }

    .OrderContent {
      width: 100%;
      font-size: 15px;

      .priceContent {
        height: 24px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-bottom: 40px;
      }

      .volumeContent {
        display: flex;
        flex-direction: column;
        padding-bottom: 20px;
        border-bottom: 0.1px solid #d3cece99;
      }

      .totalContent {
        height: 24px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-top: 20px;
        padding-bottom: 20px;
      }

      .text {
        color: #292828;
      }

      .cancleVolumeText {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }

      .maximumVolumeNum {
        color: ${(props) => (props.orderType === "매수" ? "#e22926" : "#2679ed")};
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
        color: ${(props) => (props.orderType === "매수" ? "#e22926" : "#2679ed")};
        background-color: ${(props) => (props.orderType === "매수" ? "#fcdddb" : "#dce9fc")};
      }

      .confirm {
        color: white;
        background-color: ${(props) => (props.orderType === "매수" ? "#e22926" : "#2679ed")};
      }
    }
  }
`;

const VolumeSettingBox = styled.div`
  padding-top: 10px;
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

const ToastMessage = styled.div<{ orderType: string }>`
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
    color: ${(props) => (props.orderType === "매수" ? "#e22926" : "#2679ed")};
  }
`;
