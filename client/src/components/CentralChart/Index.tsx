import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { StateProps } from "../../models/stateProps";

import UpperMenuBar from "../CentralChartMenu/Index";
import KospiChart from "./KospiChart";
import StockChart from "./StockChart";

const CentralChart = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);

  return (
    <Container>
      <UpperMenuBar />
      {companyId === 0 ? <KospiChart /> : <StockChart />}
      {/* <StockChart /> */}
    </Container>
  );
};

export default CentralChart;

const Container = styled.div`
  flex: 6.7 0 0;
  min-width: 630px;
  height: 100%;

  display: flex;
  flex-direction: column;
`;
