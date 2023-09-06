// client/src/components/Signups/Welcome.tsx
import React from 'react';
import styled from 'styled-components';
import StockHolmLogo from '../../asset/images/StockHolmLogo.png';

const Welcome: React.FC<WelcomeProps> = ({ onClose }) => {
    return (
        <ModalBackground>
            <ModalContainer>
                <Title>환영합니다.</Title>
                <Logo src={StockHolmLogo} alt="StockHolm Logo" />
                <ConfirmButton onClick={onClose}>시작하기</ConfirmButton> 
            </ModalContainer>
        </ModalBackground>
    );
};

export default Welcome;

type WelcomeProps = {
    onClose: () => void;
  };

// 모달 배경 스타일
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

// 모달 컨테이너 스타일
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

// 모달 제목 스타일
const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem;
  font-weight: 400;
`;

// 스톡홀름 로고 스타일
const Logo = styled.img`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 150px;  // 이미지 크기 조절을 위해 추가
  height: auto;
`;

// 시작하기 버튼 스타일
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
