import { styled } from "styled-components";

import SearchBox from "./SearchBox";
import CompareList from "./CompareList";

const titleText: string = "비교차트";

const CompareChartSection = () => {
  return (
    <Container>
      <UpperBar>
        <Title>{titleText}</Title>
        <CloseBtn>&#10005;</CloseBtn>
      </UpperBar>
      <SearchBox />
      <CompareList />
    </Container>
  );
};

export default CompareChartSection;

const Container = styled.div`
  position: fixed;
  left: 0px;
  transition: 0.3s left ease-in-out;
  display: flex;
  flex-direction: column;
  min-width: 248px;
  height: 100%;
  border: 1px solid black;
`;

const UpperBar = styled.div`
  position: relative;
  width: 100%;
  height: 43px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid darkgray;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 500;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  width: 28px;
  height: 95%;
  border: none;
  font-size: 17px;
  font-weight: 500;
  color: #525252;
  background-color: #ffff;
`;
