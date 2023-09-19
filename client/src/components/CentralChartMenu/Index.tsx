import { useSelector } from "react-redux";
import { styled } from "styled-components";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import { StateProps } from "../../models/stateProps";
import ExpandScreenBtn from "./ExpandScreenBtn";
import StockOverview from "./StockOverview";
import StockOrderBtn from "./StockOrderBtn";

const UpperMenuBar = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const { stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);

  if (stockInfoLoading) {
    return <></>;
  }

  if (stockInfoError) {
    return <p>에러 발생</p>;
  }

  return (
    <Container>
      <div className="FirstLine">
        <ExpandScreenBtn direction="left" />
        <StockOverview />
        <StockOrderBtn type="buying" />
        <StockOrderBtn type="selling" />
        <ExpandScreenBtn direction="right" />
      </div>
    </Container>
  );
};

export default UpperMenuBar;

const Container = styled.div`
  width: 100%;
  text-align: center;

  .FirstLine {
    width: 100%;
    height: 44px;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid black;
  }

  .SecondLine {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid black;
  }
`;
