import { useState, useCallback } from "react";
import styled from "styled-components";
import LogoutHeader from "../components/Headers/LogoutHeader";
import LoginHeader from "../components/Headers/LoginHeader";
import OAuthLoginModal from "../components/Logins/OAuthLogin";
import EmailLoginModal from "../components/Logins/EmailLogin";
import EmailSignupModal from "../components/Signups/EmailSignup";
import EmailVerificationModal from "../components/Signups/EmailCertify";
import PasswordSettingModal from "../components/Signups/Password";

// 왼쪽 비교차트
import CompareChartSection from "../components/CompareChartSection/Index";

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

  const [isEmailVerificationModalOpen, setEmailVerificationModalOpen] =
    useState(false);

  const openEmailVerificationModal = useCallback(() => {
    setEmailSignupModalOpen(false); // 이메일 회원가입 모달 닫기
    setEmailVerificationModalOpen(true); // 이메일 인증 모달 열기
  }, []);

  const closeEmailVerificationModal = useCallback(() => {
    setEmailVerificationModalOpen(false);
  }, []);

  const [isPasswordSettingModalOpen, setPasswordSettingModalOpen] =
    useState(false);

  const openPasswordSettingModal = useCallback(() => {
    setEmailVerificationModalOpen(false); // 이메일 인증 모달 닫기
    setPasswordSettingModalOpen(true); // 비밀번호 설정 모달 열기
  }, []);

  const closePasswordSettingModal = useCallback(() => {
    setPasswordSettingModalOpen(false);
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Container>
      {isLoggedIn ? (
        <LoginHeader onLogoutClick={handleLogout} /> // 로그아웃 버튼 클릭 핸들러 추가
      ) : (
        <LogoutHeader onLoginClick={openOAuthModal} />
      )}
      <Main>
        <CompareChartSection />
        <LeftSection></LeftSection>
        <CentralSection></CentralSection>
        <RightSection></RightSection>
      </Main>
      {isOAuthModalOpen && (
        <OAuthLoginModal
          onClose={closeOAuthModal}
          onEmailLoginClick={openEmailLoginModal}
          onEmailSignupClick={openEmailSignupModal}
        />
      )}
      {isEmailLoginModalOpen && (
        <EmailLoginModal
          onClose={closeEmailLoginModal}
          onLogin={handleLogin} // 추가된 prop
        />
      )}

      {isEmailSignupModalOpen && (
        <EmailSignupModal
          onClose={closeEmailSignupModal}
          onRequestVerification={openEmailVerificationModal} // 추가된 prop
        />
      )}

      {isEmailVerificationModalOpen && (
        <EmailVerificationModal
          onClose={closeEmailVerificationModal}
          onNextStep={openPasswordSettingModal} // 추가된 prop
        />
      )}

      {isPasswordSettingModalOpen && (
        <PasswordSettingModal
          onClose={() => {
            handleLogin();
            closePasswordSettingModal();
          }}
        />
      )}
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
