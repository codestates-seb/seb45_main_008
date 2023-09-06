// /client/src/components/Signups/EmailCertify.tsx
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

// 고정 문자열을 정의
const strings = {
    titleText: "이메일 인증요청",
    emailLabelText: "인증할 이메일",
    codeLabelText: "인증코드",
    nextStepText: "인증 후 다음단계",
    codeHintText: "이메일로 전송된 코드를 입력하세요",
    termsText: "개인정보 처리방침 및 서비스 이용약관에 동의합니다"
};

// 이메일 인증 모달 컴포넌트
const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({ onClose, onNextStep, initialEmail }) => {
    // 이메일 및 인증코드에 대한 상태를 선언합니다.
    const [email, setEmail] = useState(initialEmail);
    const [verificationCode, setVerificationCode] = useState('');

    // 동의 상태와 알림 상태를 선언합니다.
    const [hasAgreed, setHasAgreed] = useState(false);
    const [showAgreementError, setShowAgreementError] = useState(false);

    // 이메일 입력값을 처리하는 함수
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    // 인증코드 입력값을 처리하는 함수
    const handleVerificationCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVerificationCode(event.target.value);
    };

    // 체크박스의 변경을 감지하는 핸들러
    const handleAgreementChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setHasAgreed(event.target.checked);
        setShowAgreementError(false); // 알림을 숨깁니다.
    };

    // 다음 단계 버튼 클릭시 이메일 인증을 처리하는 함수
    const handleNextStepClick = async () => {
        // 동의 확인
        if (!hasAgreed) {
            setShowAgreementError(true); // 알림을 표시합니다.
            return;
        }

        try {
            const response = await axios.post('http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/email/confirm', { email, code: verificationCode });
            if (response.status === 200) {
                onNextStep();
            } else {
                console.error('Error during email confirmation');
            }
        } catch (error) {
            console.error('Error during email confirmation:', error);
        }
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{strings.titleText}</Title>
                <Label>{strings.emailLabelText}</Label>
                <Input type="email" value={email} onChange={handleEmailChange} />
                <Label>{strings.codeLabelText}</Label>
                <Input type="text" placeholder={strings.codeHintText} value={verificationCode} onChange={handleVerificationCodeChange} />
                <HintText>{strings.codeHintText}</HintText>
                <TermsCheckbox>
                    <input type="checkbox" id="terms" onChange={handleAgreementChange} />
                    <label htmlFor="terms">{strings.termsText}</label>
                </TermsCheckbox>

                {showAgreementError && <ErrorMessage>동의하지 않으면 진행할 수 없습니다</ErrorMessage>}
                <SignupButton onClick={handleNextStepClick}>
                    {strings.nextStepText}
                </SignupButton>
            </ModalContainer>
        </ModalBackground>
    );
};

export default EmailVerificationModal;

// 이메일 인증 모달의 Props 타입
type EmailVerificationModalProps = {
    onClose: () => void;
    onNextStep: () => void;
    initialEmail: string;  // 추가된 부분
};

// 모달의 배경 스타일
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

// 모달의 컨테이너 스타일
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

// 모달의 닫기 버튼 스타일
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #FFFFFF;
  border: 1px solid lightgray;
  font-size: 1.5rem;
  cursor: pointer;
`;

// 제목의 스타일
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
`;

// 레이블의 스타일
const Label = styled.label`
  align-self: flex-start;
  margin-top: 10px;
`;

// 입력 필드의 스타일
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid lightgray;
  border-radius: 5px;
`;

// 버튼의 스타일
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

// 힌트 텍스트의 스타일
const HintText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

// 이용약관 체크박스의 스타일
const TermsCheckbox = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;

  input[type="checkbox"] {
    margin-right: 5px;
  }

  label {
    font-size: 0.9rem;
  }
`;

// 오류 메시지 스타일을 추가합니다.
const ErrorMessage = styled.p`
  color: red;
  margin-top: 5px;
  margin-bottom: 10px;
  font-size: 0.8rem;
`;