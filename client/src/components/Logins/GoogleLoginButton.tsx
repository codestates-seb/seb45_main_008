import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../../reducer/member/loginSlice';  
import googleLogo from '../../asset/images/GoogleLogo.svg'; 

interface Props {
  backendURL: string;
}

const GoogleLoginButton: React.FC<Props> = ({ backendURL }) => {
  const dispatch = useDispatch();

  const buttonText = "Login with Google";

  const handleLoginClick = () => {
    window.location.href = `${backendURL}`;
    dispatch(setLoginState());  // 로그인 상태를 변경합니다.
  };

  return (
    <GoogleButton onClick={handleLoginClick}>
      <LogoImage src={googleLogo} alt="Google Logo" />
      {buttonText}
    </GoogleButton>
  );
}

// Styled Components
const GoogleButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #FFFFFF;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoImage = styled.img`
  margin-right: 30px;
  width: 60px;
  height: auto;
`;

export default GoogleLoginButton;
