import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";
import styled from "styled-components";

import LogoutHeader from "../components/Headers/LogoutHeader";
import LoginHeader from "../components/Headers/LoginHeader";

import OAuthLoginModal from "../components/Logins/OAuthLogin";
import EmailLoginModal from "../components/Logins/EmailLogin";
import LoginConfirmationModal from "../components/Logins/LoginConfirmatationModal";

import EmailSignupModal from "../components/Signups/EmailSignup";
import EmailVerificationModal from "../components/Signups/EmailCertify";
import PasswordSettingModal from "../components/Signups/Password";
import Welcome from "../components/Signups/Welcome";
import GuideModal from "../components/Signups/Guide";

import CentralChart from "../components/CentralChart/Index";

import EntireList from "../components/EntireList/EntireList";
import HoldingList from "../components/HoldingList/HoldingList";
import WatchList from "../components/WatchList/WatchList"; // Assuming you have a Holdings component
import CompareChartSection from "../components/CompareChartSection/Index";
import StockOrderSection from "../components/StockOrderSection/Index";

import ProfileModal from "../components/Profile/profileModal";
// import CashModal from "../components/Profile/cashModal";
import { StateProps } from "../models/stateProps";
import { TabContainerPage } from "./TabPages/TabContainerPage";
import { RootState } from "../store/config";

// 🔴 로그아웃 관련 action 함수
import { setLoginState } from "../reducer/member/loginSlice";

const MainPage = () => {
  const expandScreen = useSelector((state: StateProps) => state.expandScreen);

  const [isOAuthModalOpen, setOAuthModalOpen] = useState(false);
  const [isEmailLoginModalOpen, setEmailLoginModalOpen] = useState(false);
  const [isEmailSignupModalOpen, setEmailSignupModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false); //프로필 모달 보이기/숨기기

  const dispatch = useDispatch();

  const isLogin = useSelector((state: RootState) => state.login);
  console.log(isLogin);

  // 🔴 페이지 로드 시 로컬 스토리지의 토큰을 기반으로 로그인 상태를 확인합니다.
  useEffect(() => {
    const acessToken = localStorage.getItem("accessToken");
    if (acessToken !== null) {
      dispatch(setLoginState());
    }
  }, [dispatch]);

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

  // 이메일 인증 모달을 열 때 사용자가 입력한 이메일을 저장하도록 변경
  const openEmailVerificationModal = useCallback((enteredEmail: string) => {
    setEmailSignupModalOpen(false);
    setEmailVerificationModalOpen(true);
    setUserEmail(enteredEmail); // 사용자가 입력한 이메일을 저장
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

  const openWelcomeModal = useCallback(() => {
    setPasswordSettingModalOpen(false); // 비밀번호 설정 모달 닫기
    setWelcomeModalOpen(true); // Welcome 모달 열기
  }, []);

  const closeWelcomeModal = useCallback(() => {
    setWelcomeModalOpen(false);
    setGuideModalOpen(true); // Open the GuideModal after closing the WelcomeModal
  }, []);

  const closeGuideModal = useCallback(() => {
    setGuideModalOpen(false);
    openOAuthModal();
  }, [openOAuthModal]);


  //프로필 모달 열고닫는 매커니즘
  const openProfileModal = useCallback(() => {
    setProfileModalOpen(true);
  }, []);

  const [isLoginConfirmationModalOpen, setLoginConfirmationModalOpen] = useState(false);

  const handleLogin = () => {
    closeEmailLoginModal();
    setLoginConfirmationModalOpen(true);
    dispatch(setLoginState());
  };

  const handleLoginConfirmationClose = () => {
    setLoginConfirmationModalOpen(false);
  };

  // 현재 선택된 메뉴 타입을 상태로 관리
  const [selectedMenu, setSelectedMenu] = useState<"전체종목" | "관심종목" | "보유종목">("전체종목");

  // 메뉴 변경 핸들러
  const handleMenuChange = (menu: "전체종목" | "관심종목" | "보유종목") => {
    setSelectedMenu(menu);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");

    if (accessToken && refreshToken) {
        localStorage.setItem("accessToken", `Bearer ${accessToken}`);
        localStorage.setItem("refreshToken", refreshToken);
        dispatch(setLoginState());
        // Remove access_token and refresh_token from the URL
        urlParams.delete("access_token");
        urlParams.delete("refresh_token");
        window.history.replaceState({}, "", "?" + urlParams.toString());

        window.location.reload();


    }
  }, [dispatch]);

  const [isGuideModalOpen, setGuideModalOpen] = useState(false);

  return (
    <Container>
      {isLogin == 1 ? <LoginHeader onProfileClick={openProfileModal} /> : <LogoutHeader onLoginClick={openOAuthModal} />}
      <Main>
        <CompareChartSection />
        {!expandScreen.left && (
          <LeftSection>
            {selectedMenu === "전체종목" ? (
              <EntireList currentListType={selectedMenu} onChangeListType={handleMenuChange} />
            ) : selectedMenu === "관심종목" ? (
              <WatchList currentListType={selectedMenu} onChangeListType={handleMenuChange} />
            ) : selectedMenu === "보유종목" ? (
              <HoldingList currentListType={selectedMenu} onChangeListType={handleMenuChange} />
            ) : null}
          </LeftSection>
        )}
        <CentralChart />
        <StockOrderSection />
        {!expandScreen.right && <TabContainerPage></TabContainerPage>}
      </Main>
      {isOAuthModalOpen && (
        <OAuthLoginModal
          onClose={closeOAuthModal}
          onEmailLoginClick={openEmailLoginModal}
          onEmailSignupClick={openEmailSignupModal}
          onWatchListClick={() => handleMenuChange("관심종목")}
          onHoldingsClick={() => handleMenuChange("보유종목")}
        />
      )}

      {isEmailLoginModalOpen && <EmailLoginModal onClose={closeEmailLoginModal} onLogin={handleLogin} />}
      {isLoginConfirmationModalOpen && <LoginConfirmationModal onClose={handleLoginConfirmationClose} />}

      {isEmailSignupModalOpen && <EmailSignupModal onClose={closeEmailSignupModal} onRequestVerification={openEmailVerificationModal} />}
      {isEmailVerificationModalOpen && <EmailVerificationModal onClose={closeEmailVerificationModal} onNextStep={openPasswordSettingModal} initialEmail={userEmail} />}

      {isPasswordSettingModalOpen && (
        <PasswordSettingModal
          onClose={closePasswordSettingModal} // Password 모달을 닫는다.
          onNext={openWelcomeModal} // Welcome 모달을 연다.
          email={userEmail} // email을 userEmail로 설정
        />
      )}
      {isWelcomeModalOpen && (
        <Welcome
          onClose={() => {
            closeWelcomeModal();
          }}
        />
      )}
      {isGuideModalOpen && <GuideModal onClose={closeGuideModal} />}
      {isProfileModalOpen && <ProfileModal onClose={() => setProfileModalOpen(false)} />}
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

const LeftSection = styled.section`
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
