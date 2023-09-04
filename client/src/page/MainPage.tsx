import { styled } from "styled-components";
// import LogoutHeader from "../components/Headers/LogoutHeader";
import LoginHeader from "../components/Headers/LoginHeader";

import { TabContainerPage } from "./TabPages/TabContainerPage";
const MainPage = () => {
  return (
    <Container>
      <LoginHeader />
      {/* <LogoutHeader /> */}
      <Main>
        <LeftSection></LeftSection>
        <CentralSection></CentralSection>
        <TabContainerPage></TabContainerPage>
      </Main>
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100vw;
  height: ;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const LeftSection = styled.section`
  min-width: 248px;
  height: 100%;
  border: 1px solid black;
`;

const CentralSection = styled.section`
  flex: 6.7 0 0;
  min-width: 630px;
  height: 100%;
`;
