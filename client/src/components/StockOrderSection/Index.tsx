import { useSelector, useDispatch } from "react-redux";
import { styled } from "styled-components";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import { stockOrderClose } from "../../reducer/StockOrderSet-Reducer";
import { StateProps } from "../../models/stateProps";

import OrderRequest from "./OrderRequest";
import OrderResult from "./OrderResult";

const titleText: string = "주식주문";
const marketType: string = "코스피";

// dummyData
import { dummyStockName } from "./dummyData";

const StockOrderSection = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const stockOrderSet = useSelector((state: StateProps) => state.stockOrderSet);
  const dispatch = useDispatch();

  const { data, isLoading, error } = useGetStockInfo(companyId);

  const handleStockOrderClose = () => {
    dispatch(stockOrderClose());
  };

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  const corpName = data.korName;
  const stockCode = data.code;

  return (
    <Container orderSet={stockOrderSet}>
      <UpperBar>
        <h2 className="Title">{titleText}</h2>
        <button className="CloseButton" onClick={handleStockOrderClose}>
          &#10005;
        </button>
      </UpperBar>
      <StockName>
        <img className="CorpLogo" src={dummyStockName.corpLogo} />
        <div className="NameContainer">
          <div className="CorpName">{corpName}</div>
          <div className="StockCode">
            {stockCode} {marketType}
          </div>
        </div>
      </StockName>
      <OrderRequest />
      <OrderResult />
    </Container>
  );
};

export default StockOrderSection;

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
  border-left: 1px solid black;
  background-color: #ffffff;
`;

const UpperBar = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 43px;
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
  border-bottom: 1px solid black;

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
