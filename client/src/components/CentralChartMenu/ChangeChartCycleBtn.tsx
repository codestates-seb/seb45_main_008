import { styled } from "styled-components";

const chartCylceText01: string = "30분";
const chartCylceText02: string = "일";
const chartCylceText03: string = "주";
const chartCylceText04: string = "월";
const chartCylceText05: string = "년";

const ChangeChartCycleBtn = () => {
  return (
    <Container>
      <Button>{chartCylceText01}</Button>
      <Button>{chartCylceText02}</Button>
      <Button>{chartCylceText03}</Button>
      <Button>{chartCylceText04}</Button>
      <Button>{chartCylceText05}</Button>
    </Container>
  );
};

export default ChangeChartCycleBtn;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  color: #999999;
`;
