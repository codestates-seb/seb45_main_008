// KakaoLoginButton.tsx

import React from 'react';

interface Props {
  backendURL: string;
}

const KakaoLoginButton: React.FC<Props> = ({ backendURL }) => {
  const handleLoginClick = () => {
    window.location.href = `${backendURL}`;
  };

  return (
    <button onClick={handleLoginClick}>
      Login with Kakao
    </button>
  );
}

export default KakaoLoginButton;
