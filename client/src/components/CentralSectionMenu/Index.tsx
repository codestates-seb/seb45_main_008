import { styled } from "styled-components";

import FirstLineMenu from "./FirstLineMenu";
import SecondLineMenu from "./SecondLineMenu";

const UpperMenuBar = () => {
  return (
    <Container>
      <FirstLineMenu />
      <SecondLineMenu />
    </Container>
  );
};

export default UpperMenuBar;

const Container = styled.div`
  width: 100%;
  text-align: center;
`;
