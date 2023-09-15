// GoogleLoginButton.tsx

import React from 'react';

interface Props {
  backendURL: string;
}

const GoogleLoginButton: React.FC<Props> = ({ backendURL }) => {
  const handleLoginClick = () => {
    window.location.href = `${backendURL}`;
  };

  return (
    <button onClick={handleLoginClick}>
      Login with Google
    </button>
  );
}

export default GoogleLoginButton;
