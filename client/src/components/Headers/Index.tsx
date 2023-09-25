import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/config';
import LoginHeader from './LoginHeader';
import LogoutHeader from './LogoutHeader';

const Header: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.login);

  if (isLogin === 1) {
    return <LoginHeader onProfileClick={() => { /* Handle profile click logic here */ }} />;
  }
  
  return <LogoutHeader onLoginClick={() => { /* Handle login click logic here */ }} />;
}

export default Header;
