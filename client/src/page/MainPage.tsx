import { useState, useCallback } from "react";
import styled from "styled-components";
import LogoutHeader from "../components/Headers/LogoutHeader";
import LoginHeader from "../components/Headers/LoginHeader";
import OAuthLoginModal from "../components/Logins/OAuthLogin";
import EmailLoginModal from "../components/Logins/EmailLogin";
import EmailSignupModal from "../components/Signups/EmailSignup";
import EmailVerificationModal from "../components/Signups/EmailCertify";
import PasswordSettingModal from "../components/Signups/Password";
import CentralChartSection from "../components/CentralChartSection/Index";
import WatchList from "../components/watchlist/WatchList";
import Holdings from "../components/watchlist/Holdings"; // Assuming you have a Holdings component
import CompareChartSection from "../components/CompareChartSection/Index";
import StockOrderSection from "../components/StockOrderSection/Index";

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

  const [isEmailVerificationModalOpen, setEmailVerificationModalOpen] = useState(false);

  const openEmailVerificationModal = useCallback(() => {
    setEmailSignupModalOpen(false); // 이메일 회원가입 모달 닫기
    setEmailVerificationModalOpen(true); // 이메일 인증 모달 열기
  }, []);

  const closeEmailVerificationModal = useCallback(() => {
    setEmailVerificationModalOpen(false);
  }, []);

  const [isPasswordSettingModalOpen, setPasswordSettingModalOpen] = useState(false);

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

  const [selectedMenu, setSelectedMenu] = useState<"관심목록" | "투자목록">("투자목록"); // Default menu is 관심목록

  const handleMenuChange = (menu: "관심목록" | "투자목록") => {
    setSelectedMenu(menu);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Container>
      {isLoggedIn ? (
        <LoginHeader onLogoutClick={handleLogout} />
      ) : (
        <LogoutHeader onLoginClick={openOAuthModal} />
      )}
      <Main>
        <CompareChartSection />
        <LeftSection>
          {selectedMenu === "관심목록" ? (
            <WatchList 
              key="watchlist"
              currentListType={selectedMenu}
              onChangeListType={handleMenuChange}
            />
          ) : (
            <Holdings 
              currentListType={selectedMenu}
              onChangeListType={handleMenuChange}
            />
          )}
        </LeftSection>
        <CentralChartSection />
        <StockOrderSection />
        <RightSection></RightSection>
      </Main>
      {isOAuthModalOpen && (
        <OAuthLoginModal
          onClose={closeOAuthModal}
          onEmailLoginClick={openEmailLoginModal}
          onEmailSignupClick={openEmailSignupModal}
          onWatchListClick={() => handleMenuChange("관심목록")}
          onHoldingsClick={() => handleMenuChange("투자목록")}
        />
      )}
      {isEmailLoginModalOpen && (
        <EmailLoginModal
          onClose={closeEmailLoginModal}
          onLogin={handleLogin}
        />
      )}
      {isEmailSignupModalOpen && (
        <EmailSignupModal
          onClose={closeEmailSignupModal}
          onRequestVerification={openEmailVerificationModal}
        />
      )}
      {isEmailVerificationModalOpen && (
        <EmailVerificationModal
          onClose={closeEmailVerificationModal}
          onNextStep={openPasswordSettingModal}
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

export const RightSection = styled.section`
  width: 26%;
  min-width: 400px;
  height: 100%;
  border: 1px solid black;
`;