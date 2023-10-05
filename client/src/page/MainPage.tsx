import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import HeaderComponent from '../components/Headers/Index';
import SignupComponent from '../components/Signups/Index';
import LoginComponent from '../components/Logins/Index';
import ProfileComponent from '../components/Profile/Index';

import ListSection from '../components/EntireList/ListSection';
import CentralChart from '../components/CentralChart/Index';
import StockOrderSection from '../components/StockOrderSection/Index';

import { StateProps } from '../models/stateProps';
import { TabContainerPage } from './TabPages/TabContainerPage';

import useModalManagement from '../hooks/customHooks/useModalManagement';
import useAutoLogout from '../hooks/customHooks/useAutoLogout';
import useOAuthLogin from '../hooks/customHooks/useOAuthLogin';

const MainPage = () => {
  const expandScreen = useSelector((state: StateProps) => state.expandScreen);
  const isLogin = useSelector((state: StateProps) => state.login);


  const {
    isProfileModalOpen, 
    openProfileModal, 
    openOAuthModal,
    setProfileModalOpen,
    ...modalProps
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useModalManagement() as any;
  const propsForSignup = modalProps.propsForSignup;
  const propsForLogin = modalProps.propsForLogin;

  useAutoLogout();
  useOAuthLogin();

  // 현재 선택된 메뉴 타입을 상태로 관리
  const [selectedMenu, setSelectedMenu] = useState<'전체종목' | '관심종목' | '보유종목'>('전체종목');

  // 메뉴 변경 핸들러
  const handleMenuChange = (menu: '전체종목' | '관심종목' | '보유종목') => {
    setSelectedMenu(menu);
  };

  return (
    <Container>
      <HeaderComponent isLogin={isLogin} onProfileClick={openProfileModal} onLoginClick={openOAuthModal} />
      <Main>
        <LeftSection leftExpand={expandScreen.left}>
          <ListSection selectedMenu={selectedMenu} handleMenuChange={handleMenuChange} openOAuthModal={openOAuthModal} />
        </LeftSection>
        <CentralChart />
        <StockOrderSection openOAuthModal={openOAuthModal} openProfileModal={openProfileModal} />
        <TabContainerPage />
      </Main>
      <SignupComponent {...propsForSignup} />
      <LoginComponent {...propsForLogin} />
      <ProfileComponent isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} />
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const LeftSection = styled.section<{ leftExpand: boolean }>`
  display: ${(props) => props.leftExpand && 'none'};
  min-width: 248px;
  height: 100%;
  border-right: 1px solid black;
`;

export const RightSection = styled.section`
  width: 26%;
  min-width: 400px;
  height: 100%;
  border: 1px solid black;
`;
