import styled from 'styled-components';

const strings = {
    titleText: "비밀번호 설정",
    passwordLabelText: "비밀번호",
    confirmPasswordLabelText: "비밀번호 확인",
    nicknameLabelText: "닉네임",
    confirmButtonText: "확인"
  };
  
  const PasswordSettingModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    return (
      <ModalBackground>
        <ModalContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>{strings.titleText}</Title>
          <Label>{strings.passwordLabelText}</Label>
          <Input type="password" placeholder="8~16자리 비밀번호를 입력해주세요" />
          <Label>{strings.confirmPasswordLabelText}</Label>
          <Input type="password" placeholder="비밀번호를 다시 입력해주세요" />
          <Label>{strings.nicknameLabelText}</Label>
          <Input type="text" placeholder="닉네임을 입력해주세요" />
          <ConfirmButton>{strings.confirmButtonText}</ConfirmButton>
        </ModalContainer>
      </ModalBackground>
    );
  };
  
  export default PasswordSettingModal;
  
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

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
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


const ConfirmButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: darkslategray;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;