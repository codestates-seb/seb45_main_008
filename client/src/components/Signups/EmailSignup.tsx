// client/src/components/Signups/EmailSignup.tsx
import axios from 'axios';
import styled from 'styled-components';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setEmailForVerification } from '../../reducer/member/memberInfoSlice';

// 문자열 상수 정의
const strings = {
  titleText: "이메일로 회원가입",
  emailLabelText: "이메일",
  requestVerificationText: "이메일 인증요청",
  invalidEmailText: "유효하지 않은 이메일입니다"
};

const EmailSignupModal: React.FC<EmailSignupModalProps> = ({ onClose, onRequestVerification }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isInvalidEmail, setIsInvalidEmail] = useState(false);  
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    setIsInvalidEmail(false);
  };

  const validateEmail = (email: string) => {
    return email.includes('@') && email.includes('.com');
  };

  const handleVerificationRequest = async () => {
    if (!validateEmail(email)) {
      setIsInvalidEmail(true);
      return;
    }
  
    try {
      const response = await axios.post(
        'http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/email/send', 
        { email },
        {
          validateStatus: function (status) {
            return status >= 200 && status < 600;  // Reject only if status code is greater than or equal to 600
          }
        }
      );
      
      if (response.status === 200) {
        dispatch(setEmailForVerification(email));
        onRequestVerification(email);
      } else if (response.status === 400) {
        setErrorMessage(response.data.message);
      } else if (response.status === 500) {
        setErrorMessage(JSON.stringify(response.data));
      } else {
        console.error('Error sending verification email');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error sending verification email:', error);
        if (error.response) {
          console.error('Detailed server response:', error.response.data);
        }
      } else {
        console.error('An unknown error occurred:', error);
      }
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </ModalContainer>
    </ModalBackground>
  );
};

export default EmailSignupModal;

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
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

//모달 컨테이너
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


//닫기 버튼
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFFFFF;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

//제목 :이메일로 회원가입
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
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
`;

// 오류 메시지 스타일
const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;