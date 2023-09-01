import { styled } from "styled-components";
import ChangeChartCycleBtn from "./SLineChangeChartCycleBtn";

const ChangeChartCycleBox = () => {
  return (
    <Container>
      <ChangeChartCycleBtn cycle="30분" />
      <ChangeChartCycleBtn cycle="일" />
      <ChangeChartCycleBtn cycle="주" />
      <ChangeChartCycleBtn cycle="월" />
      <ChangeChartCycleBtn cycle="년" />
    </Container>
  );
};

export default ChangeChartCycleBox;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;
