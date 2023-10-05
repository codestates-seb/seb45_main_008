// SignupComponent.tsx
import React from 'react';
import EmailSignupModal from "./EmailSignup";
import EmailVerificationModal from "./EmailCertify";
import PasswordSettingModal from "./Password";
import Welcome from "./Welcome";
import GuideModal from "./Guide";

interface SignupProps {
  isEmailSignupModalOpen: boolean;
  isEmailVerificationModalOpen: boolean;
  isPasswordSettingModalOpen: boolean;
  isWelcomeModalOpen: boolean;
  isGuideModalOpen: boolean;
  userEmail: string;
  openEmailVerificationModal: (email: string) => void;
  closeEmailSignupModal: () => void;
  openPasswordSettingModal: () => void;
  closeEmailVerificationModal: () => void;
  openWelcomeModal: () => void;
  closePasswordSettingModal: () => void;
  closeWelcomeModal: () => void;
  closeGuideModal: () => void;
}

const SignupComponent: React.FC<SignupProps> = ({
  isEmailSignupModalOpen,
  isEmailVerificationModalOpen,
  isPasswordSettingModalOpen,
  isWelcomeModalOpen,
  isGuideModalOpen,
  userEmail,
  openEmailVerificationModal,
  closeEmailSignupModal,
  openPasswordSettingModal,
  closeEmailVerificationModal,
  openWelcomeModal,
  closePasswordSettingModal,
  closeWelcomeModal,
  closeGuideModal
}) => {
  return (
    <>
      {isEmailSignupModalOpen && <EmailSignupModal onClose={closeEmailSignupModal} onRequestVerification={openEmailVerificationModal} />}
      {isEmailVerificationModalOpen && <EmailVerificationModal onClose={closeEmailVerificationModal} onNextStep={openPasswordSettingModal} initialEmail={userEmail} />}
      {isPasswordSettingModalOpen && <PasswordSettingModal onClose={closePasswordSettingModal} onNext={openWelcomeModal} email={userEmail} />}
      {isWelcomeModalOpen && <Welcome onClose={closeWelcomeModal} />}
      {isGuideModalOpen && <GuideModal onClose={closeGuideModal} />}
    </>
  );
};

export default SignupComponent;
