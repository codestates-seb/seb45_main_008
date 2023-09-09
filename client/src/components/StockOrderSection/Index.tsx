import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import { stockOrderClose } from "../../reducer/StockOrderSet-Reducer";
import { StateProps } from "../../models/stateProps";

import StockOrder from "./StockOrder";
import OrderResult from "./OrderResult";

const loginRequiredText: string = "로그인이 필요한 서비스입니다";
const loginBtnText: string = "StockHolm 로그인";

const titleText: string = "주식주문";
const marketType: string = "코스피";

// dummyData
import dummyLogo from "../../asset/CentralSectionMenu-dummyImg.png";
import { useState } from "react";

const StockOrderSection = () => {
  // 🔴 로그인 구현될 때까지 임시
  const [login, setLogin] = useState(true);

  const companyId = useSelector((state: StateProps) => state.companyId);
  const stockOrderSet = useSelector((state: StateProps) => state.stockOrderSet);
  const dispatch = useDispatch();

  const { stockInfo, stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);

  if (stockInfoLoading) {
    return <></>;
  }

  if (stockInfoError) {
    return <></>;
  }

  const corpName = stockInfo.korName;
  const stockCode = stockInfo.code;

  const handleStockOrderClose = () => {
    dispatch(stockOrderClose());
  };

  return (
    <Container orderSet={stockOrderSet}>
      <UpperBar>
        <h2 className="Title">{titleText}</h2>
        <button className="CloseButton" onClick={handleStockOrderClose}>
          &#10005;
        </button>
      </UpperBar>
      {login ? (
        <>
          <StockName>
            <img className="CorpLogo" src={dummyLogo} />
            <div className="NameContainer">
              <div className="CorpName">{corpName}</div>
              <div className="StockCode">
                {stockCode} {marketType}
              </div>
            </div>
          </StockName>
          <StockOrder />
          <OrderResult />
        </>
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

const Container = styled.aside<{ orderSet: boolean }>`
  position: fixed;
  z-index: 1;
  right: ${(props) => (props.orderSet ? "0px" : "-500px")};
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  width: 26%;
  min-width: 400px;
  height: 100%;
  box-shadow: -1px 0px 10px darkgray;

  background-color: #ffffff;
`;

const UpperBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 44px;
  border-bottom: 1px solid darkgray;

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
