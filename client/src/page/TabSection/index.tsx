import { TabContainerStyle } from "../TabStyle/TabContainerStyle";
import MarketInfo from "./MarketInfo";
import { Routes, Route } from "react-router-dom";
import { Nav, TabNavArea } from "../TabStyle/TabNavArea";
import { StockItems } from "./StockItems";
import { Community } from "./community";
import { Status } from "./Status";
import { BsFillPieChartFill } from "react-icons/bs";
export const TabContainer = () => {
  return (
    <TabContainerStyle>
      <TabNavArea>
        <Nav to="/">
          <BsFillPieChartFill
            style={{
              color: "red",
              fontSize: "16px",
              lineHeight: "",
            }}
          />
          시장정보
        </Nav>
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
    </TabContainerStyle>
  );
};
