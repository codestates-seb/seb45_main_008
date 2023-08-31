import { useState, useCallback } from 'react';
import styled from "styled-components";
import LogoutHeader from "../components/Headers/LogoutHeader";
import LoginHeader from "../components/Headers/LoginHeader";
import OAuthLoginModal from "../components/Logins/OAuthLogin";
import EmailLoginModal from "../components/Logins/EmailLogin";
import EmailSignupModal from "../components/Signups/EmailSignup";

const MainPage = () => {
  const [isOAuthModalOpen, setOAuthModalOpen] = useState(false);
  const [isEmailLoginModalOpen, setEmailLoginModalOpen] = useState(false);
  const [isEmailSignupModalOpen, setEmailSignupModalOpen] = useState(false);

  const openOAuthModal = useCallback(() => {
    setOAuthModalOpen(true);
  }, []);

  const closeOAuthModal = useCallback(() => {
    setOAuthModalOpen(false);
  }, []);

  const openEmailLoginModal = useCallback(() => {
    setOAuthModalOpen(false); 
    setEmailLoginModalOpen(true); 
  }, []);

  const closeEmailLoginModal = useCallback(() => {
    setEmailLoginModalOpen(false);
  }, []);

  const openEmailSignupModal = useCallback(() => {
    setOAuthModalOpen(false); 
    setEmailSignupModalOpen(true); 
  }, []);

  const closeEmailSignupModal = useCallback(() => {
    setEmailSignupModalOpen(false);
  }, []);

  return (
    <Container>
      <LoginHeader />
      <LogoutHeader onLoginClick={openOAuthModal} />
      <Main>
        <LeftSection></LeftSection>
        <CentralSection></CentralSection>
        <RightSection></RightSection>
      </Main>
      {isOAuthModalOpen && <OAuthLoginModal 
        onClose={closeOAuthModal} 
        onEmailLoginClick={openEmailLoginModal} 
        onEmailSignupClick={openEmailSignupModal} 
      />}
      {isEmailLoginModalOpen && <EmailLoginModal onClose={closeEmailLoginModal} />}
      {isEmailSignupModalOpen && <EmailSignupModal onClose={closeEmailSignupModal} />}
    </Container>
  );
};

export default MainPage;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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

const RightSection = styled.section`
  flex: 3.3 0 0;
  min-width: 400px;
  height: 100%;
  border: 1px solid black;
`;

const CentralSection = styled.section`
  flex: 6.7 0 0;
  min-width: 630px;
  height: 100%;
`;
