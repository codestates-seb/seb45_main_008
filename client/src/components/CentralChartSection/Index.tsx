import { styled } from "styled-components";

import UpperMenuBar from "../CentralSectionMenu/Index";
import StockChart from "./StockChart";

const CentralChartSection = () => {
  return (
    <Container>
      <UpperMenuBar />
      <StockChart />
    </Container>
  );
};

export default CentralChartSection;

const Container = styled.div`
  flex: 6.7 0 0;
  min-width: 630px;
  height: 100%;

  display: flex;
  flex-direction: column;
`;
