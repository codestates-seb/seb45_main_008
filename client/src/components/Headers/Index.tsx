// HeaderComponent.tsx
import React from 'react';
import LoginHeader from "./LoginHeader";
import LogoutHeader from "./LogoutHeader";

interface HeaderProps {
  isLogin: number;
  onProfileClick: () => void;
  onLoginClick: () => void;
}

const HeaderComponent: React.FC<HeaderProps> = ({ isLogin, onProfileClick, onLoginClick }) => {
  return isLogin === 1 ? (
    <LoginHeader onProfileClick={onProfileClick} />
  ) : (
    <LogoutHeader onLoginClick={onLoginClick} />
  );
};

export default HeaderComponent;
