import { styled } from "styled-components";

import ExpandScreenBtn from "./FirstLineExpandScreenBtn";
import StockInfoOverview from "./FirstLineStockInfoOverview";
import BookmarkBtn from "./FirstLineBookmarkBtn";
import TradeBtn from "./FirstLineTradeBtn";

const FirstLineMenu = () => {
  return (
    <Container>
      <ExpandScreenBtn direction="left" />
      <StockInfoOverview />
      <BookmarkBtn />
      <TradeBtn type="buying" />
      <TradeBtn type="selling" />
      <ExpandScreenBtn direction="right" />
    </Container>
  );
};

export default FirstLineMenu;

const Container = styled.div`
  width: 100%;
  height: 44px;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid darkgray;
`;
