import React from 'react';
import styled from 'styled-components';
import googleLogo from '../../asset/images/GoogleLogo.svg'; 
import kakaoLogo from '../../asset/images/KakaoLogo.svg';  
import axios from 'axios';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

const OAuthLoginModal: React.FC<LoginModalProps> = ({ onClose, onEmailLoginClick, onEmailSignupClick }) => {
    const titleText = "로그인";
    const googleLoginText = "구글로 로그인";
    const kakaoLoginText = "카카오로 로그인";
    const orText = "또는";
    const emailLoginText = "이메일로 로그인";
    const emailSignupText = "이메일로 회원가입";

    const responseGoogle = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(response);
        // 여기서 응답 데이터를 처리하거나 백엔드에 전송할 수 있습니다.
    }

    const handleKakaoLogin = async () => {
        try {
            const response = await axios.get('/oauth2/authorization/kakao');
            if (response.status === 200) {
                const redirectUri = response.data.uri;
                window.location.href = redirectUri;
            } else {
                console.error("Error logging in with Kakao, unexpected status code:", response.status);
            }
        } catch (error) {
            console.error("Error logging in with Kakao:", error);
        }
    };

    return (
        <ModalBackground>
            <ModalContainer>
                <CloseButton onClick={onClose}>&times;</CloseButton>
                <Title>{titleText}</Title>
                <StyledGoogleLogin
                  clientId="47991654230-k0vku25t92sageg12thm05nfm9nro1rh.apps.googleusercontent.com"
                  buttonText={googleLoginText}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={'single_host_origin'}
                  uxMode="redirect"
                  redirectUri={window.location.origin}
              >
                  <LogoImage src={googleLogo} alt="Google Logo" />
              </StyledGoogleLogin>
                <KakaoButton onClick={handleKakaoLogin}>
                    <LogoImage src={kakaoLogo} alt="Kakao Logo" />
                    {kakaoLoginText}
                </KakaoButton>
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

const StyledGoogleLogin = styled(GoogleLogin)`
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

const KakaoButton = styled.button`
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
