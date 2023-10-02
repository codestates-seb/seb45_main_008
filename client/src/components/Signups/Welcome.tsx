import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import StockHolmLogo from "../../asset/logos/StockHolmLogo.png";

// Constants for the text strings
const WELCOME_TEXT = "환영합니다, ";
const START_TEXT = "시작하기";
const JOINED_DATE_TEXT = "가입일: ";

const Welcome: React.FC<WelcomeProps> = ({ onClose }) => {
  //스토어에서 유저정보 불러오기
  const memberInfo = useSelector((state: RootState) => state.memberInfo.memberInfo);
  // 엔터키를 눌렀을 때의 핸들러
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onClose();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 1을 더함
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일 ${hours}:${minutes}`;
  };

  return (
    <ModalBackground onKeyDown={handleKeyPress} tabIndex={0}>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <ModalContainer>
          <Title>
            {WELCOME_TEXT}
            {memberInfo?.name}님!
          </Title>{" "}
          {/* Display the member's name */}
          <Subtitle>
            {JOINED_DATE_TEXT}
            {memberInfo?.createdAt && formatDate(memberInfo.createdAt)}
          </Subtitle>{" "}
          {/* Display the member's createdAt */}
          <Logo src={StockHolmLogo} alt="StockHolm Logo" />
          <ConfirmButton onClick={onClose}>{START_TEXT}</ConfirmButton>
        </ModalContainer>
      </motion.div>
    </ModalBackground>
  );
};

export default Welcome;

interface WelcomeProps {
  onClose: () => void;
}

// 유저 정보 변수 타입
interface MemberInfo {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  createdAt: string;
}

interface RootState {
  memberInfo: {
    memberInfo: MemberInfo | null;
  };
}

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
  font-weight: 400;
`;

const Subtitle = styled.h3`
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 1.2rem;
  font-weight: 300;
  color: slategray;
`;

const Logo = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 150px;
  height: auto;
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

  //호버 시 밝게
  &:hover {
    background-color: rgba(47, 79, 79, 0.8);
  }
`;
