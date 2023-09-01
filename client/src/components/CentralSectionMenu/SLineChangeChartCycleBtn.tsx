import { styled } from "styled-components";

const ChangeChartCycleBtn = (props: OwnProps) => {
  const { cycle } = props;
  return <Container>{cycle}</Container>;
};

export default ChangeChartCycleBtn;

// type 정의
interface OwnProps {
  cycle: string;
}

// component 생성
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-right: 14px;
  color: #999999;
`;
