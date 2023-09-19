
import React, { useEffect } from "react";
import styled from "styled-components";
import GoogleLoginButton from "./GoogleLoginButton";
import KakaoLoginButton from "./KakaoLoginButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/config";

const OAuthLoginModal: React.FC<LoginModalProps> = ({ onClose, onEmailLoginClick, onEmailSignupClick, onLoginSuccess }) => {
  const titleText = "로그인";
  const orText = "또는";
  const emailLoginText = "이메일로 로그인";
  const emailSignupText = "이메일로 회원가입";

  //소셜로그인 주소
  const GOOGLE_BACKEND_URL = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google";
  const KAKAO_BACKEND_URL = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao";

  //로그인 전역변수 불러오기
  const loginState = useSelector((state: RootState) => state.login);

  // 이미 로그인상태라면 모달창 닫기
  useEffect(() => {
    if (loginState === 1) {
      onLoginSuccess();
      onClose();
    }
  }, [loginState, onClose]);

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{titleText}</Title>
        <GoogleLoginButton backendURL={GOOGLE_BACKEND_URL} />
        <KakaoLoginButton backendURL={KAKAO_BACKEND_URL} />
        <OrText>{orText}</OrText>
        <EmailButtonsContainer>
          <EmailButton onClick={onEmailLoginClick}>{emailLoginText}</EmailButton>
          <EmailButton onClick={onEmailSignupClick}>{emailSignupText}</EmailButton>
        </EmailButtonsContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default OAuthLoginModal;

//변수 타입
interface LoginModalProps {

  onClose: () => void;
  onEmailLoginClick: () => void;
  onEmailSignupClick: () => void;
  onLoginSuccess: () => void;
  onWatchListClick: () => void;
  onHoldingsClick: () => void;
}

// 모달창 띄웠을 때 배경 스타일
const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

//모달 컨테이너 스타일
const ModalContainer = styled.div`
  z-index: 100;
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

//닫기 버튼 스타일
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ffffff;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 5px;
`;

//제목 스타일
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
`;

const OrText = styled.span`
  margin: 20px 0;
  color: grey;
`;

// 버튼 컨테이너 스타일
const EmailButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin: 5px 0;
`;

//이메일 로그인, 이메일 회원가입 버튼 스타일
const EmailButton = styled.button`
  margin: 5px 0;
  padding: 10px 20px;
  background-color: #ffffff;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2; // 호버 시 밝은 회색 배경 적용
  }
`;
