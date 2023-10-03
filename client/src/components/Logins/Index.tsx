// LoginComponent.tsx
import React from 'react';
import OAuthLoginModal from "./OAuthLogin";
import EmailLoginModal from "./EmailLogin";
import LoginConfirmationModal from "./LoginConfirmatationModal";

interface LoginProps {
  isOAuthModalOpen: boolean;
  isEmailLoginModalOpen: boolean;
  isLoginConfirmationModalOpen: boolean;
  closeOAuthModal: () => void;
  openEmailLoginModal: () => void;
  closeEmailLoginModal: () => void;
  handleLoginConfirmationClose: () => void;
}

const LoginComponent: React.FC<LoginProps> = ({
  isOAuthModalOpen,
  isEmailLoginModalOpen,
  isLoginConfirmationModalOpen,
  closeOAuthModal,
  openEmailLoginModal,
  closeEmailLoginModal,
  handleLoginConfirmationClose
}) => {
  return (
    <>
      {isOAuthModalOpen && <OAuthLoginModal onClose={closeOAuthModal} onEmailLoginClick={openEmailLoginModal} />}
      {isEmailLoginModalOpen && <EmailLoginModal onClose={closeEmailLoginModal} />}
      {isLoginConfirmationModalOpen && <LoginConfirmationModal onClose={handleLoginConfirmationClose} />}
    </>
  );
};

export default LoginComponent;
