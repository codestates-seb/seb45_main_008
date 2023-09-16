import React from 'react';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../../reducer/member/loginSlice';  

interface Props {
  backendURL: string;
}

const GoogleLoginButton: React.FC<Props> = ({ backendURL }) => {
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    window.location.href = `${backendURL}`;
    dispatch(setLoginState());  // 로그인 상태를 변경합니다.
  };

  return (
    <button onClick={handleLoginClick}>
      Login with Google
    </button>
  );
}

export default GoogleLoginButton;
