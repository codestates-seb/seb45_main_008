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
  onEmailSignupClick?: () => void;

}

const LoginComponent: React.FC<LoginProps> = ({
  isOAuthModalOpen,
  isEmailLoginModalOpen,
  isLoginConfirmationModalOpen,
  closeOAuthModal,
  openEmailLoginModal,
  closeEmailLoginModal,
  handleLoginConfirmationClose,
  onEmailSignupClick = () => {},  // Default to a no-op function if not provided

}) => {
  return (
    <>
      {isOAuthModalOpen && <OAuthLoginModal onClose={closeOAuthModal} onEmailLoginClick={openEmailLoginModal} onEmailSignupClick={onEmailSignupClick}/>}
      {isEmailLoginModalOpen && <EmailLoginModal onClose={closeEmailLoginModal} onSignup={onEmailSignupClick} />}
      {isLoginConfirmationModalOpen && <LoginConfirmationModal onClose={handleLoginConfirmationClose} />}
    </>
  );
};

export default LoginComponent;
