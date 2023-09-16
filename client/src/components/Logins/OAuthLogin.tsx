import React, { useEffect } from 'react';
import styled from 'styled-components';
import GoogleLoginButton from './GoogleLoginButton';
import KakaoLoginButton from './KakaoLoginButton';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/config';
import TokenHandler from './TokenHandler';

const OAuthLoginModal: React.FC<LoginModalProps> = ({ onClose, onEmailLoginClick, onEmailSignupClick, onLoginSuccess  }) => {
    const titleText = "로그인";
    const orText = "또는";
    const emailLoginText = "이메일로 로그인";
    const emailSignupText = "이메일로 회원가입";

    const loginState = useSelector((state: RootState) => state.login);

    useEffect(() => {
        if (loginState === 1) {
            onLoginSuccess(); 
            onClose();
        }
    }, [loginState, onClose]);

    return (
        <ModalBackground>
            <ModalContainer>
                <TokenHandler />
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{titleText}</Title>
                <GoogleLoginButton backendURL="http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/google" />
                <KakaoLoginButton backendURL="http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao" />
                <OrText>{orText}</OrText>
                <EmailButtonsContainer>
                    <EmailButton onClick={onEmailLoginClick}>{emailLoginText}</EmailButton>
                    <EmailButton onClick={onEmailSignupClick}>{emailSignupText}</EmailButton>
                </EmailButtonsContainer>
            </ModalContainer>
        </ModalBackground>
    );
};

interface LoginModalProps {
    onClose: () => void;
    onEmailLoginClick: () => void;
    onEmailSignupClick: () => void;
    onLoginSuccess: () => void;  // 추가된 부분
    onWatchListClick: () => void;
    onHoldingsClick: () => void;
}

const ModalBackground = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
`;

const ModalContainer = styled.div`
    z-index:4000;
    position: relative;
    background-color: white;
    padding: 20px;
    width: 400px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background: #FFFFFF;
    border: 1px solid lightgray;
    font-size: 1.5rem;
    cursor: pointer;
`;

const Title = styled.h2`
    margin-bottom: 20px;
    font-size: 1.6rem;
    font-weight: 400;
`;

const OrText = styled.span`
    margin: 20px 0;
    color: grey;
`;

const EmailButtonsContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 100%;
    margin: 5px 0;
`;

const EmailButton = styled.button`
    margin: 5px 0;
    padding: 10px 20px;
    background-color: #FFFFFF;
    border: 1px solid lightgray;
    border-radius: 5px;
    cursor: pointer;
`;

export default OAuthLoginModal;
