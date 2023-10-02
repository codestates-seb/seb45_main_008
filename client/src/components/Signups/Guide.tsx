import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const STRINGS = {
  GUIDE_TITLE: "StockHolm 가이드",
  LOGIN_GUIDE: "☑️ 로그인을 하면 다양한 기능을 활용할 수 있습니다",
  CASH_GUIDE: "☑️ 현금은 프로필 현금 충천 탭에서 충전할 수 있습니다",
};

const GuideModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onClose();
    }
  };

  return (
    <ModalBackground onKeyDown={handleKeyDown} tabIndex={0}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <ModalContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>{STRINGS.GUIDE_TITLE}</Title>
          <Content>{STRINGS.LOGIN_GUIDE}</Content>
          <Content>{STRINGS.CASH_GUIDE}</Content>
        </ModalContainer>
      </motion.div>
    </ModalBackground>
  );
};

export default GuideModal;

// Reuse the styles from the other modals

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

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 550;
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

const Content = styled.p`
  margin: 15px; // 간격 조정
  font-size: 0.95rem; // 폰트 크기 증가
  font-weight: 500;
  line-height: 70%;
  color: #555; // 색상 변경
  text-align: center; // 텍스트 중앙 정렬
`;
