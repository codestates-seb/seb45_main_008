// client/src/components/Signups/EmailSignup.tsx
import axios from "axios";
import styled from "styled-components";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { setEmailForVerification } from "../../reducer/member/memberInfoSlice";

// 문자열 상수 정의
const strings = {
  titleText: "이메일로 회원가입",
  emailLabelText: "이메일",
  requestVerificationText: "이메일 인증요청",
  invalidEmailText: "유효하지 않은 이메일입니다",
  emailSend: "이메일이 전송되었습니다",
};

const EmailSignupModal: React.FC<EmailSignupModalProps> = ({ onClose, onRequestVerification }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  // 이메일 입력값 변경 핸들러
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsInvalidEmail(false);
  };

  // 이메일 유효성 검사 함수
  const validateEmail = (email: string) => {
    return email.includes("@") && email.includes(".com");
  };

  // 이메일 입력창에서 엔터키를 눌렀을 때의 핸들러
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleVerificationRequest();
    }
  };

  // 이메일 인증 요청 핸들러
  const handleVerificationRequest = async () => {
    if (!validateEmail(email)) {
      setIsInvalidEmail(true);
      return;
    }

    try {
      const response = await axios.post(
        "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/email/send",
        { email },
        {
          validateStatus: function (status) {
            return status >= 200 && status < 600; // 상태 코드가 600 이상인 경우만 거부
          },
        }
      );

      // 응답 상태에 따른 처리
      if (response.status === 200) {
        dispatch(setEmailForVerification(email));
        onRequestVerification(email);
        setEmailSent(true); // 이 부분 추가
      } else if (response.status === 400) {
        setErrorMessage(response.data.message);
      } else if (response.status === 500) {
        setErrorMessage(JSON.stringify(response.data));
      } else {
        console.error("이메일 인증 발송 중 오류 발생");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("이메일 인증 발송 중 오류:", error);
        if (error.response) {
          console.error("상세한 서버 응답:", error.response.data);
        }
      } else {
        console.error("알 수 없는 오류 발생:", error);
      }
    }
  };

  return (
    <ModalBackground>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <ModalContainer>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Title>{strings.titleText}</Title>
          <Label>{strings.emailLabelText}</Label>
          <Input type="email" placeholder="이메일을 입력하세요" value={email} onChange={handleEmailChange} onKeyDown={handleKeyPress} />
          {emailSent && <SuccessMessage>{strings.emailSend}</SuccessMessage>}
          {isInvalidEmail && <ErrorMessage>{strings.invalidEmailText}</ErrorMessage>}
          <SignupButton onClick={handleVerificationRequest}>{strings.requestVerificationText}</SignupButton>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </ModalContainer>
      </motion.div>
    </ModalBackground>
  );
};

export default EmailSignupModal;

//변수 타입 정의
type EmailSignupModalProps = {
  onClose: () => void;
  onRequestVerification: (email: string) => void;
};

//모달 배경
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

//모달 컨테이너
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

//닫기 버튼
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

//제목 :이메일로 회원가입
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
`;

//라벨 : 이메일
const Label = styled.label`
  align-self: flex-start;
  margin-top: 10px;
`;

//이메일 입력창
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

// 오류 메시지 스타일
const ErrorMessage = styled.p`
  color: #e22926;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;

//이메일 인증요청 버튼
const SignupButton = styled.button`
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
const SuccessMessage = styled.p`
  color: #e22926; // 빨간색
  margin-top: 5px;
  font-size: 0.8rem;
`;
