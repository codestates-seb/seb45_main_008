import { styled } from "styled-components";

import ExpandScreenBtn from "./FLineExpandScreenBtn";
import StockInfoOverview from "./FLineStockInfoOverview";
import BookmarkBtn from "./FLineBookmarkBtn";
import TradeBtn from "./FLineTradeBtn";

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
