import styled from 'styled-components';

const EmailLoginModal = ({ onClose }: { onClose: () => void }) => {
  // 문자열 변수 정의
  const titleText = "이메일로 로그인";
  const emailLabelText = "이메일";
  const passwordLabelText = "비밀번호";
  const findPasswordText = "비밀번호 찾기";
  const loginButtonText = "로그인";
  const noAccountText = "계정이 없습니까?";
  const registerButtonText = "회원가입하기";

  return (
    <ModalBackground>
      <ModalContainer>
        <CloseButton onClick={onClose}>&times;</CloseButton> {/* 닫기 버튼 추가 */}
        <Title>{titleText}</Title>
        <Label>{emailLabelText}</Label>
        <Input type="email" placeholder="이메일을 입력하세요" />
        <Label>{passwordLabelText}</Label>
        <Input type="password" placeholder="비밀번호를 입력하세요" />
        <RightAlignedButton>{findPasswordText}</RightAlignedButton>
        <LoginButton>{loginButtonText}</LoginButton>
        <BottomText>
          {noAccountText} <RegisterButton>{registerButtonText}</RegisterButton>
        </BottomText>
      </ModalContainer>
    </ModalBackground>
  );
};

export default EmailLoginModal;

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

const RightAlignedButton = styled.button`
  align-self: flex-end;
  margin-top: 5px;
  background: none;
  border: none;
  color: slategray; // 글자색을 변경합니다.
  cursor: pointer;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: darkslategray; // 배경색을 변경합니다.
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const BottomText = styled.div`
  margin-top: 10px;
  font-size: 0.9rem; // 크기를 줄입니다.
`;

const RegisterButton = styled.button`
  background: none;
  border: none;
  color: slategray;  // 글자색을 변경합니다.
  cursor: pointer;
`;