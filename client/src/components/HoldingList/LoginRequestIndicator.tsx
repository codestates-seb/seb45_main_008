// LoginRequestIndicator.tsx

import React from "react";
import styled from "styled-components";


interface LoginRequestIndicatorProps {
  openOAuthModal: () => void;
}

const LoginRequestIndicator: React.FC<LoginRequestIndicatorProps> = ({ openOAuthModal }) => {
  return (
    <LoginRequestContainer>
      <div className="Notification">로그인이 필요한 서비스입니다.</div>
      <button className="LoginButton" onClick={openOAuthModal}>StockHolm 로그인</button>
    </LoginRequestContainer>
  );
};

const LoginRequestContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;

  .Notification {
    color: #999999;
  }

  .LoginButton {
    width: 170px;
    height: 32px;
    font-size: 15px;
    font-weight: 400;
    color: white;
    background-color: #2f4f4f;
    border: none;
    border-radius: 0.3rem;
    cursor: pointer;  
  }
`;

export default LoginRequestIndicator;