import axios from "axios";
import styled from "styled-components";
import React, { useState } from "react";
import { setLoginState } from "../../reducer/member/loginSlice";
import { useDispatch } from "react-redux";

// 이메일 로그인 모달 컴포넌트
const EmailLoginModal: React.FC<EmailLoginModalProps> = ({ onClose, onLogin }) => {
  // 상수 문자열 정의
  const titleText = "이메일로 로그인";
  const emailLabelText = "이메일";
  const passwordLabelText = "비밀번호";
  const findPasswordText = "비밀번호 찾기";
  const loginButtonText = "로그인";
  const noAccountText = "계정이 없습니까?";
  const registerButtonText = "회원가입하기";

  //디스패치 함수 가져오기
  const dispatch = useDispatch();

  // 상태 변수 정의
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 이메일 변경 핸들러
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  // 비밀번호 변경 핸들러
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  // 로그인 버튼 클릭 핸들러
  const handleLoginClick = async () => {
    try {
      const response = await axios.post("http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/members/login", {
        email,
        password,
      });
      if (response.status === 200) {
        const accessToken = response.headers["authorization"];
        console.log(accessToken);

        const refreshToken = response.headers["refresh"];

        // 로그인 상태로 만들기
        dispatch(setLoginState());

        // 토큰들을 로컬 스토리지에 저장
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

        onLogin();
        onClose();
      } else {
        console.error("로그인 중 오류 발생");
      }
    } catch (error) {
      console.error("로그인 중 오류:", error);
    }
  };

  return (
    // 모달 레이아웃
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{titleText}</Title>
        <Label>{emailLabelText}</Label>
        <Input type="email" placeholder="이메일을 입력하세요" value={email} onChange={handleEmailChange} />
        <Label>{passwordLabelText}</Label>
        <Input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={handlePasswordChange} />
        <RightAlignedButton>{findPasswordText}</RightAlignedButton>
        <LoginButton onClick={handleLoginClick}>{loginButtonText}</LoginButton>
        <BottomText>
          {noAccountText} <RegisterButton>{registerButtonText}</RegisterButton>
        </BottomText>
      </ModalContainer>
    </ModalBackground>
  );
};

export default EmailLoginModal;

// 컴포넌트 props 타입 정의
interface EmailLoginModalProps {
  onClose: () => void;
  onLogin: () => void;
}

// 스타일드 컴포넌트 정의
const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  padding: 20px;
  width: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #ffffff;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
`;

const Label = styled.label`
  align-self: flex-start;
  margin-top: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

const RightAlignedButton = styled.button`
  align-self: flex-end;
  margin-top: 5px;
  background: none;
  border: none;
  color: slategray;
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: darkslategray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BottomText = styled.div`
  margin-top: 10px;
  font-size: 0.9rem;
`;

const RegisterButton = styled.button`
  background: none;
  border: none;
  color: slategray;
  cursor: pointer;
`;
