import { useState, useCallback } from 'react';

const useModalManagement = () => {
  const [isOAuthModalOpen, setOAuthModalOpen] = useState(false);
  const [isEmailLoginModalOpen, setEmailLoginModalOpen] = useState(false);
  const [isEmailSignupModalOpen, setEmailSignupModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isWelcomeModalOpen, setWelcomeModalOpen] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isEmailVerificationModalOpen, setEmailVerificationModalOpen] = useState(false);
  const [isPasswordSettingModalOpen, setPasswordSettingModalOpen] = useState(false);
  const [isLoginConfirmationModalOpen, setLoginConfirmationModalOpen] = useState(false);
  const [isGuideModalOpen, setGuideModalOpen] = useState(false);

  const openOAuthModal = useCallback(() => {
    setOAuthModalOpen(true);
  }, []);

  const closeOAuthModal = useCallback(() => {
    setOAuthModalOpen(false);
  }, []);

  const openEmailLoginModal = useCallback(() => {
    setOAuthModalOpen(false);
    setEmailLoginModalOpen(true);
  }, []);

  const closeEmailLoginModal = useCallback(() => {
    setEmailLoginModalOpen(false);
  }, []);

  const openEmailSignupModal = useCallback(() => {
    setOAuthModalOpen(false);
    setEmailSignupModalOpen(true);
  }, []);

  const closeEmailSignupModal = useCallback(() => {
    setEmailSignupModalOpen(false);
  }, []);

  const openEmailSignupFromLogin = useCallback(() => {
    closeEmailLoginModal();
    openEmailSignupModal();
  }, [closeEmailLoginModal, openEmailSignupModal]);

  const openEmailVerificationModal = useCallback((enteredEmail: string) => {
    setEmailSignupModalOpen(false);
    setEmailVerificationModalOpen(true);
    setUserEmail(enteredEmail);
  }, []);

  const closeEmailVerificationModal = useCallback(() => {
    setEmailVerificationModalOpen(false);
  }, []);

  const openPasswordSettingModal = useCallback(() => {
    setEmailVerificationModalOpen(false);
    setPasswordSettingModalOpen(true);
  }, []);

  const closePasswordSettingModal = useCallback(() => {
    setPasswordSettingModalOpen(false);
  }, []);

  const openWelcomeModal = useCallback(() => {
    setPasswordSettingModalOpen(false);
    setWelcomeModalOpen(true);
  }, []);

  const closeWelcomeModal = useCallback(() => {
    setWelcomeModalOpen(false);
    setGuideModalOpen(true);
  }, []);

  const closeGuideModal = useCallback(() => {
    setGuideModalOpen(false);
    openOAuthModal();
  }, [openOAuthModal]);

  const openProfileModal = useCallback(() => {
    setProfileModalOpen(true);
  }, []);

  const closeProfileModal = useCallback(() => {
    setProfileModalOpen(false);
  }, []);

  const handleLoginConfirmationClose = useCallback(() => {
    setLoginConfirmationModalOpen(false);
  }, []);
  const propsForSignup = {
    isEmailSignupModalOpen,
    setEmailSignupModalOpen,
    userEmail,
    setUserEmail,
    isEmailVerificationModalOpen,
    setEmailVerificationModalOpen,
    isPasswordSettingModalOpen,
    setPasswordSettingModalOpen,
    isWelcomeModalOpen,
    setWelcomeModalOpen,
    isGuideModalOpen,
    setGuideModalOpen,
    openEmailVerificationModal,
    closeEmailSignupModal,
    openPasswordSettingModal,
    closePasswordSettingModal,
    openWelcomeModal,
    closeWelcomeModal,
    closeGuideModal,
    closeEmailVerificationModal
};

const propsForLogin = {
    
    isOAuthModalOpen,
    isEmailLoginModalOpen,
    closeOAuthModal,
    openEmailLoginModal,
    closeEmailLoginModal,
    handleLoginConfirmationClose,
    openEmailSignupFromLogin,
    isLoginConfirmationModalOpen
};


  return {
    isOAuthModalOpen, setOAuthModalOpen,
    isEmailLoginModalOpen, setEmailLoginModalOpen,
    isEmailSignupModalOpen, setEmailSignupModalOpen,
    userEmail, setUserEmail,
    isWelcomeModalOpen, setWelcomeModalOpen,
    isProfileModalOpen, setProfileModalOpen,
    isEmailVerificationModalOpen, setEmailVerificationModalOpen,
    isPasswordSettingModalOpen, setPasswordSettingModalOpen,
    isLoginConfirmationModalOpen, setLoginConfirmationModalOpen,
    isGuideModalOpen, setGuideModalOpen,
    openOAuthModal, closeOAuthModal,
    openEmailLoginModal, closeEmailLoginModal,
    openEmailSignupModal, closeEmailSignupModal,
    openEmailSignupFromLogin, openEmailVerificationModal,
    closeEmailVerificationModal, openPasswordSettingModal,
    closePasswordSettingModal, openWelcomeModal,
    closeWelcomeModal, closeGuideModal,
    openProfileModal, closeProfileModal,
    handleLoginConfirmationClose,
    propsForSignup, propsForLogin
  };
};

export default useModalManagement;
