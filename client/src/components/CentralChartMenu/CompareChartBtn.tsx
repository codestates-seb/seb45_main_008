import { styled } from "styled-components";

import IconImg from "../../asset/CentralSectionMenu-compareChart.png";

const buttonText: string = "비교차트";

const CompareChartBtn = () => {
  return (
    <Container>
      <Icon src={IconImg} />
      <div className="BtntextContainer">{buttonText}</div>
    </Container>
  );
};

export default CompareChartBtn;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 12px;

  .BtntextContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 3px;
  }
`;

const Icon = styled.img`
  width: auto;
  height: 28px;
  border-radius: 50%;
  padding-right: 4px;
`;
