import axios from 'axios';
import styled from 'styled-components';
import React, { useState } from 'react';

// 문자열 상수 정의
const strings = {
  titleText: "이메일로 회원가입",
  emailLabelText: "이메일",
  requestVerificationText: "이메일 인증요청",
  invalidEmailText: "유효하지 않은 이메일입니다"
};

const EmailSignupModal: React.FC<EmailSignupModalProps> = ({ onClose, onRequestVerification }) => {
  // 사용자가 입력한 이메일 상태
  const [email, setEmail] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);  // 이메일 유효성 상태

  // 이메일 입력 핸들러
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsInvalidEmail(false);
  };

  //이메일 유효성 검사
  const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.com');
  };

  // 이메일 인증 요청 핸들러
  const handleVerificationRequest = async () => {

    if (!validateEmail(email)) {
      setIsInvalidEmail(true);
      return;
    }

    try {
      // 백엔드 배포 주소로 입력받은 이메일 전송
      const response = await axios.post('http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/email/send', { email });
      if (response.status === 200) {
        onRequestVerification();
      } else {
        console.error('Error sending verification email');
      }
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{strings.titleText}</Title>
        <Label>{strings.emailLabelText}</Label>
        <Input type="email" placeholder="이메일을 입력하세요" value={email} onChange={handleEmailChange} />
        {isInvalidEmail && <ErrorMessage>{strings.invalidEmailText}</ErrorMessage>}
        <SignupButton onClick={handleVerificationRequest}>
          {strings.requestVerificationText}
        </SignupButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default EmailSignupModal;

// 프롭 타입 정의
type EmailSignupModalProps = {
  onClose: () => void;
  onRequestVerification: () => void;
};

// 스타일 컴포넌트 정의
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
  background: #FFFFFF;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
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

const SignupButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: darkslategray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

// 오류 메시지 스타일
const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;