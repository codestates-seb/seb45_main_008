import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import useGetStockData from "../../hooks/useGetStockData";
import useGetCash from "../../hooks/useGetCash";
import useGetStockOrderRecord from "../../hooks/useGetStockOrderRecord";
import useGetHoldingStock from "../../hooks/useGetHoldingStock";
import useGetCompanyList from "../../hooks/useGetCompanyList";
import { stockOrderClose } from "../../reducer/StockOrderSet-Reducer";
import { StateProps } from "../../models/stateProps";
import StockOrder from "./StockOrder";
import OrderResult from "./OrderResult";

const errorMessage: string = "정보를 불러올 수 없습니다";
const errorButtonText: string = "닫기";
const loginRequiredText: string = "로그인이 필요한 서비스입니다";
const loginBtnText: string = "StockHolm 로그인";
const upperbarTitle: string = "주식주문";
const marketType: string = "코스피";

// dummyData
import dummyLogo from "../../asset/CentralSectionMenu-dummyImg.png";

const StockOrderSection = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state: StateProps) => state.login);
  const companyId = useSelector((state: StateProps) => state.companyId);
  const stockOrderSet = useSelector((state: StateProps) => state.stockOrderSet);

  const { stockInfo, stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);
  const { stockPrice, stockPriceLoading, stockPriceError } = useGetStockData(companyId);
  const { cashLoading, cashError } = useGetCash();
  const { orderRecordLoading, orderRecordError } = useGetStockOrderRecord();
  const { holdingStockLoading, holdingStockError } = useGetHoldingStock();
  const { compnayListLoading, companyListError } = useGetCompanyList();

  // fetching 데이터 loading, error 여부
  const isLoading = stockInfoLoading || stockPriceLoading || cashLoading || orderRecordLoading || holdingStockLoading || compnayListLoading;
  const isError = stockInfoError || stockPriceError || cashError || orderRecordError || holdingStockError || companyListError;

  // 1) 데이터 로딩 중
  if (isLoading) {
    return <Container orderSet={stockOrderSet}>로딩 중</Container>;
  }

  // 주식주문 창 닫기
  const handleStockOrderClose = () => {
    dispatch(stockOrderClose());
  };

  // 2) 데이터 받아오기 실패 or 성공했으나 빈 데이터일 때
  if (isError || stockPrice.length === 0) {
    return (
      <Container orderSet={stockOrderSet}>
        <UpperBar>
          <h2 className="Title">{upperbarTitle}</h2>
          <button className="CloseButton" onClick={handleStockOrderClose}>
            &#10005;
          </button>
        </UpperBar>
        <div className="ErrorContainer">
          <div className="ErrorMessage">{errorMessage}</div>
          <button className="ErrorCloseButton" onClick={handleStockOrderClose}>
            {errorButtonText}
          </button>
        </div>
      </Container>
    );
  }

  // 3) 데이터 받아오기 성공
  const corpName = stockInfo.korName;
  const stockCode = stockInfo.code;

  return (
    <Container orderSet={stockOrderSet}>
      <UpperBar>
        <h2 className="Title">{upperbarTitle}</h2>
        <button className="CloseButton" onClick={handleStockOrderClose}>
          &#10005;
        </button>
      </UpperBar>
      {isLogin === 1 ? (
        <div className="mainContent">
          <StockName>
            <img className="CorpLogo" src={dummyLogo} />
            <div className="NameContainer">
              <div className="CorpName">{corpName}</div>
              <div className="StockCode">
                {stockCode} {marketType}
              </div>
            </div>
          </StockName>
          <StockOrder corpName={corpName} />
          <OrderResult />
        </div>
      ) : (
        <LoginRequestIndicator />
      )}
    </Container>
  );
};

export default StockOrderSection;

// 미로그인 시 -> 로그인 요청 화면
const LoginRequestIndicator = () => {
  return (
    <LoginRequestContainer>
      <div className="Notification">{loginRequiredText}</div>
      <button className="LoginButton">{loginBtnText}</button>
    </LoginRequestContainer>
  );
};

// component 생성
const Container = styled.aside<{ orderSet: boolean }>`
  position: fixed;
  z-index: 1;
  right: ${(props) => (props.orderSet ? "0px" : "-100vw")};
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  width: 26%;
  min-width: 400px;
  height: 100%;
  box-shadow: -1px 0px 10px darkgray;
  background-color: #ffffff;

  .mainContent {
    height: 100%;
  }

  .ErrorContainer {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;

    .ErrorMessage {
      font-size: 20px;
      color: #999999;
    }

    .ErrorCloseButton {
      width: 35%;
      height: 32px;
      color: white;
      background-color: #2f4f4f;
      border: none;
      border-radius: 0.5rem;
    }
  }
`;

const UpperBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 44px;
  border-bottom: 1px solid black;

  .Title {
    font-size: 17px;
    font-weight: 450;
    color: #1c1c1c;
  }

  .CloseButton {
    position: absolute;
    right: 10px;
    width: 28px;
    height: 95%;
    border: none;
    font-size: 20px;
    color: #525252;
    background-color: #ffff;
  }
`;

const LoginRequestContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  .Notification {
    color: #999999;
  }

  .LoginButton {
    width: 170px;
    height: 32px;
    font-size: 15px;
    font-weight: 400;
    color: white;
    background-color: #2f4f4f;
    border: none;
    border-radius: 0.3rem;
  }
`;

const StockName = styled.section`
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 8px;
  padding-left: 16px;
  gap: 9px;

  .CorpLogo {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }

  .NameContainer {
    height: 40px;
    display: flex;
    flex-direction: column;
  }

  .CorpName {
    font-size: 16px;
    font-weight: 500;
    color: #1c1c1c;
  }

  .StockCode {
    font-size: 14px;
    color: #999999;
  }
`;
