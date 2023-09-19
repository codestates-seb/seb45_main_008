import React from "react";
import styled from "styled-components";
import StockHolmLogo from "../../asset/images/StockHolmLogo.png";

const LoginConfirmationModal: React.FC<LoginConfirmationProps> = ({ onClose }) => {
  const messageText = "로그인이 성공적으로 완료되었습니다!";
  const confirmText = "확인";

  return (
    <ModalBackground>
      <ModalContainer>
        <Message>{messageText}</Message>
        <Logo src={StockHolmLogo} alt="StockHolm Logo" />
        <ConfirmButton onClick={onClose}>{confirmText}</ConfirmButton>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LoginConfirmationModal;

interface LoginConfirmationProps {
  onClose: () => void;
}

// ... Styled Components for ModalBackground, ModalContainer, Message, ConfirmButton ...
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

const Message = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: 400;
`;

const Logo = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 150px;
  height: auto;
`;

// 확인 버튼 스타일
const ConfirmButton = styled.button`
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
