import styled from 'styled-components';

const strings = {
    titleText: "이메일 인증요청",
    emailLabelText: "인증할 이메일",
    codeLabelText: "인증코드",
    nextStepText: "인증 후 다음단계",
    codeHintText: "이메일로 전송된 코드를 입력하세요",
    termsText: "개인정보 처리방침 및 서비스 이용약관에 동의합니다"
  };
  
  const EmailVerificationModal: React.FC<EmailVerificationModalProps> = ({ onClose, onNextStep }) => {
    return (
      <ModalBackground>
        <ModalContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>{strings.titleText}</Title>
          <Label>{strings.emailLabelText}</Label>
          <Input type="email" value="sample@example.com" disabled />
          <Label>{strings.codeLabelText}</Label>
          <Input type="text" placeholder={strings.codeHintText} />
          <HintText>{strings.codeHintText}</HintText>
          <TermsCheckbox>
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">{strings.termsText}</label>
          </TermsCheckbox>
          <SignupButton onClick={onNextStep}>
            {strings.nextStepText}
          </SignupButton>
        </ModalContainer>
      </ModalBackground>
    );
  };
  

export default EmailVerificationModal;

type EmailVerificationModalProps = {
    onClose: () => void;
    onNextStep: () => void;
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

const HintText = styled.p`
  color: red;
  font-size: 0.8rem;
  margin-top: 5px;
`;

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