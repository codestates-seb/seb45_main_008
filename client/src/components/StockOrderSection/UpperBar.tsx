import { styled } from "styled-components";

const titleText: string = "주식주문";

const UpperBar = () => {
  return (
    <Container>
      <Title>{titleText}</Title>
      <CloseBtn>&#10005;</CloseBtn>
    </Container>
  );
};

export default UpperBar;

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 43px;
  border-bottom: 1px solid black;
`;

const Title = styled.h2`
  font-size: 17px;
  font-weight: 450;
  color: #1c1c1c;
`;

const CloseBtn = styled.button`
  position: absolute;
  right: 10px;
  width: 28px;
  height: 100%;
  border: none;
  font-size: 20px;
  color: #525252;
  background-color: #ffff;
`;
