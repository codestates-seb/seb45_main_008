import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import LogoutHeader from "../components/Headers/LogoutHeader";
import LoginHeader from "../components/Headers/LoginHeader";
import OAuthLoginModal from "../components/Logins/OAuthLogin";
import EmailLoginModal from "../components/Logins/EmailLogin";
import LoginConfirmationModal from "../components/Logins/LoginConfirmatationModal";
import EmailSignupModal from "../components/Signups/EmailSignup";
import EmailVerificationModal from "../components/Signups/EmailCertify";
import PasswordSettingModal from "../components/Signups/Password";
import CentralChart from "../components/CentralChart/Index";
import WatchList from "../components/watchlist/WatchList";
import Holdings from "../components/watchlist/Holdings"; // Assuming you have a Holdings component
import CompareChartSection from "../components/CompareChartSection/Index";
import StockOrderSection from "../components/StockOrderSection/Index";
import Welcome from "../components/Signups/Welcome";
import ProfileModal from "../components/Profile/profileModal";
import { StateProps } from "../models/stateProps";
import { TabContainerPage } from "./TabPages/TabContainerPage";

// 🔴 로그아웃 관련 action 함수
import { setLogoutState } from "../reducer/member/loginSlice";
import { setLoginState } from "../reducer/member/loginSlice";

const MainPage = () => {
  const expandScreen = useSelector((state: StateProps) => state.expandScreen);

  const [isOAuthModalOpen, setOAuthModalOpen] = useState(false);
  const [isEmailLoginModalOpen, setEmailLoginModalOpen] = useState(false);
  const [isEmailSignupModalOpen, setEmailSignupModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false); //프로필 모달 보이기/숨기기


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
  }, []);

  // 🔴 로그인 지역 상태 제거 → 전역 상태로 대체 (지역 상태 관련된 코드 싹 다 지워야함... -> 전역 상태 만들었으니 전역 상태로 활용)
  const dispatch = useDispatch();
  const isLogin = useSelector((state: StateProps) => state.login);

    // 🔴 페이지 로드 시 로컬 스토리지의 토큰을 기반으로 로그인 상태를 확인합니다.
    useEffect(() => {
      const authToken = localStorage.getItem("authToken");
      if (authToken !== null) {
        dispatch(setLoginState());
      } else {
        dispatch(setLogoutState());
      }
    }, [dispatch]);

  // // 🔴 새로고침 되면 로그인 해제되면서 액세스 토큰도 같이 삭제됨
  // useEffect(() => {
  //   // const authToken = localStorage.getItem("authToken");

  //   // if (authToken !== null) {
  //   //   dispatch(setLoginState());
  //   // }
  //   localStorage.removeItem("authToken");
  // }, []);

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

  const [selectedMenu, setSelectedMenu] = useState<"관심목록" | "투자목록">("투자목록"); // Default menu is 관심목록

  const handleMenuChange = (menu: "관심목록" | "투자목록") => {
    setSelectedMenu(menu);
  };

  // 🔴 로그아웃 시 로컬스토리지에 있는 Auth 토큰 제거
  const handleLogout = () => {
    dispatch(setLogoutState());
    localStorage.removeItem("authToken");

  };

  return (
    <Container>
      {isLogin === 1 ? <LoginHeader onLogoutClick={handleLogout} onProfileClick={openProfileModal} /> : <LogoutHeader onLoginClick={openOAuthModal} />}

      <Main>
        <CompareChartSection />
        {!expandScreen.left && (
          <LeftSection>{selectedMenu === "관심목록" ? <WatchList key="watchlist" currentListType={selectedMenu} onChangeListType={handleMenuChange} /> : <Holdings currentListType={selectedMenu} onChangeListType={handleMenuChange} />}</LeftSection>
        )}
        <CentralChart />
        <StockOrderSection />
        {!expandScreen.right && <TabContainerPage></TabContainerPage>}
      </Main>
      {isOAuthModalOpen && (
        <OAuthLoginModal onClose={closeOAuthModal} onEmailLoginClick={openEmailLoginModal} onEmailSignupClick={openEmailSignupModal} onWatchListClick={() => handleMenuChange("관심목록")} onHoldingsClick={() => handleMenuChange("투자목록")} />
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
