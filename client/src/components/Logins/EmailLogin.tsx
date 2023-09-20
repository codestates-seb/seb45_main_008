import axios from "axios";
import styled from "styled-components";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { setLoginState } from "../../reducer/member/loginSlice";
import { setLogoutState } from "../../reducer/member/loginSlice";
import { useDispatch } from "react-redux";

const EmailLoginModal: React.FC<EmailLoginModalProps> = ({ onClose, onLogin, onSignup }) => {
  const titleText = "이메일로 로그인";
  const emailLabelText = "이메일";
  const passwordLabelText = "비밀번호";
  const findPasswordText = "비밀번호 찾기";
  const loginButtonText = "로그인";
  const noAccountText = "계정이 없습니까?";
  const registerButtonText = "회원가입하기";

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generalError, setGeneralError] = useState<string | null>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleFindPasswordClick = () => {
    alert("당신의 비밀번호는 !1q2w3e입니다.!");
  };

  const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>, target?: "password" | "loginButton") => {
    if (event.key === "Enter") {
      if (target === "password") {
        (document.querySelector('input[type="password"]') as HTMLInputElement).focus();
      } else if (target === "loginButton") {
        handleLoginClick();
      }
    }
  };

  // 🔴 자옹 로그아웃 테스트
  const handleLoginClick = async () => {
    try {
      const response = await axios.post("http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/members/login", { email, password }, { validateStatus: (status) => status >= 200 && status < 600 });

      if (response.status === 200) {
        const accessToken = response.headers["authorization"];
        const refreshToken = response.headers["refresh"];

        dispatch(setLoginState());
        if (accessToken) sessionStorage.setItem("accessToken", accessToken);
        if (refreshToken) sessionStorage.setItem("refreshToken", refreshToken);

        const toastStyle = {
          fontSize: "15px",
          fontWeight: 350,
          color: "black",
        };

        // 로그인 유지시긴 알림
        toast.warning("로그인 상태는 30분 동안 지속됩니다", {
          style: toastStyle,
          position: "top-center",
        });

        // 로그아웃 알림 1차 설정 + 이때 시간 저장
        const settingTime01 = 1000 * 7; // 10초
        const settingTime02 = 1000 * 7; // 10초
        const logoutAlarmTime01 = Date.now(); // 소환한 시간
        sessionStorage.setItem("logoutAlarmTime01", `${logoutAlarmTime01}`); // 세션 스토리지에 저장

        setTimeout(() => {
          // 첫번째 알람 실행되었으므로 -> 첫번째 시간기록 삭제
          sessionStorage.removeItem("logoutAlarmTime01");

          toast.warning("1분 뒤 로그아웃 처리됩니다", {
            style: toastStyle,
            position: "top-center",
          });

          // 2차 알람 및 로그아웃 처리 + 토큰 삭제
          const logoutAlarmTime02 = Date.now();
          sessionStorage.setItem("logoutAlarmTime02", `${logoutAlarmTime02}`);

          setTimeout(() => {
            // 두번째 알람 실행되었으므로 -> 두번째 시간기록 삭제
            sessionStorage.removeItem("logoutAlarmTime02");

            dispatch(setLogoutState());
            sessionStorage.removeItem("accessToken");
            sessionStorage.removeItem("refreshToken");

            toast.warning("로그아웃 처리되었습니다", {
              style: toastStyle,
              position: "top-center",
            });
          }, settingTime02);
        }, settingTime01);

        // onLogin();
        onClose();
      } else {
        setGeneralError(response.data.message || JSON.stringify(response.data));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setGeneralError(error.response.data.message || JSON.stringify(error.response.data));
      } else {
        console.error("로그인 중 오류:", error);
      }
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{titleText}</Title>
        <Label>{emailLabelText}</Label>
        <Input type="email" placeholder="이메일을 입력하세요" value={email} onChange={handleEmailChange} onKeyDown={(event) => handleEnterPress(event, "password")} />
        <Label>{passwordLabelText}</Label>
        <Input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={handlePasswordChange} onKeyDown={(event) => handleEnterPress(event, "loginButton")} />
        {generalError && <ErrorMessage>{generalError}</ErrorMessage>}
        <RightAlignedButton onClick={handleFindPasswordClick}>{findPasswordText}</RightAlignedButton>
        <LoginButton onClick={handleLoginClick}>{loginButtonText}</LoginButton>
        <BottomText>
          {noAccountText} <RegisterButton onClick={onSignup}>{registerButtonText}</RegisterButton>
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
  onSignup: () => void;
}

// 스타일드 컴포넌트 정의
const ModalBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 150;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

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

  //호버 시 밝게
  &:hover {
    background-color: rgba(47, 79, 79, 0.8);
  }
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
const ErrorMessage = styled.p`
  color: #e22926;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;
