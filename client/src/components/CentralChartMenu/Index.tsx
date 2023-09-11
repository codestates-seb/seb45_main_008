import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";

import ExpandScreenBtn from "./ExpandScreenBtn";
import StockOverview from "./StockOverview";
import BookmarkBtn from "./BookmarkBtn";
import StockOrderBtn from "./StockOrderBtn";
import CompareChartBtn from "./CompareChartBtn";
import ChangeChartCycleBtn from "./ChangeChartCycleBtn";

const UpperMenuBar = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);

  return (
    <Container>
      <div className="FirstLine">
        <ExpandScreenBtn direction="left" />
        {companyId === 0 ? (
          <div>구현 예정</div>
        ) : (
          <>
            <StockOverview />
            <BookmarkBtn />
            <StockOrderBtn type="buying" />
            <StockOrderBtn type="selling" />
          </>
        )}
        <ExpandScreenBtn direction="right" />
      </div>
      <div className="SecondLine">
        <CompareChartBtn />
        <ChangeChartCycleBtn />
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
    border-bottom: 1px solid darkgray;
  }

  .SecondLine {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid darkgray;
  }
`;
