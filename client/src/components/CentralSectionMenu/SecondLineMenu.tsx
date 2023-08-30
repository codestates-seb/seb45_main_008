import { styled } from "styled-components";

import CompareChartBtn from "./SLineCompareChartBtn";
import ChangeChartCycleBox from "./SLineChangeChartCycleBox";

const SecondLineMenu = () => {
  return (
    <Container>
      <CompareChartBtn />
      <ChangeChartCycleBox />
    </Container>
  );
};

export default SecondLineMenu;

const Container = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid darkgray;
`;
