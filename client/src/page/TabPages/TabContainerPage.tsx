import MarketInfo from "./MarketInfoPage";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import { StockItems } from "../../components/stockListComponents/StockItems";
import { Community } from "./communityPage";
import { Status } from "../../components/statusComponents/Status";

export const TabContainerPage = () => {
  return (
    <TabContainerStyle>
      <div style={{ overflow: "auto" }}>
        <TabNavArea>
          <Nav to="/">시장정보</Nav>
          <Nav to="/stockitems">종목정보</Nav>
          <Nav to="/community">커뮤니티</Nav>
          <Nav to="/status">투자현황</Nav>
        </TabNavArea>
        <Routes>
          <Route path="/" element={<MarketInfo />} />
          <Route path="/stockitems" element={<StockItems />} />
          <Route path="/community" element={<Community />} />
          <Route path="/status" element={<Status />} />
        </Routes>
      </div>
    </TabContainerStyle>
  );
};

const TabContainerStyle = styled.div`
  width: 26%;
  min-width: 400px;

  overflow: hidden;
  border: 1px solid black;
`;

const TabNavArea = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  justify-content: space-around;
  align-items: center;
`;

const Nav = styled(Link)`
  text-align: center;
  font-size: 12px;
  width: 100px;
  height: 30px;
  background-color: white;
  color: black;
  &:focus {
    color: red;
    transition: all 0.4s;
  }
`;
