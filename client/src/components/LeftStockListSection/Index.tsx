import { styled } from "styled-components";
import Header from "./Header";

const LeftStockListSection = () => {
  return (
    <Container>
      <Header />
    </Container>
  );
};

export default LeftStockListSection;

const Container = styled.section`
  min-width: 248px;
  height: 100%;
  border-right: 1px solid black;
`;
