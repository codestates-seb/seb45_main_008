import styled from 'styled-components';

const strings = {
  titleText: "이메일로 회원가입",
  emailLabelText: "이메일",
  requestVerificationText: "이메일 인증요청"
};

const EmailSignupModal: React.FC<EmailSignupModalProps> = ({ onClose, onRequestVerification }) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <Title>{strings.titleText}</Title>
        <Label>{strings.emailLabelText}</Label>
        <Input type="email" placeholder="이메일을 입력하세요" />
        <SignupButton onClick={onRequestVerification}>
          {strings.requestVerificationText}
        </SignupButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default EmailSignupModal;


type EmailSignupModalProps = {
  onClose: () => void;
  onRequestVerification: () => void;
};

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
  font-size: 1.6rem; // 크기를 줄입니다.
  font-weight: 400;  // 굵기를 줄입니다.
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
  background-color: darkslategray; // 배경색을 변경합니다.
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
