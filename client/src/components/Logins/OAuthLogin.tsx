import styled from 'styled-components';
import googleLogo from '../../asset/images/GoogleLogo.svg'; 
import kakaoLogo from '../../asset/images/KakaoLogo.svg';  



const OAuthLoginModal: React.FC<LoginModalProps> = ({ onClose, onEmailLoginClick, onEmailSignupClick }) => {
    const titleText = "로그인";
    const googleLoginText = "구글로 로그인";
    const kakaoLoginText = "카카오로 로그인";
    const orText = "또는";
    const emailLoginText = "이메일로 로그인";
    const emailSignupText = "이메일로 회원가입";

    return (
      <ModalBackground>
        <ModalContainer>
          <CloseButton onClick={onClose}>&times;</CloseButton>
          <Title>{titleText}</Title>
          <GoogleButton>
            <LogoImage src={googleLogo} alt="Google Logo" />
            {googleLoginText}
          </GoogleButton>
          <KakaoButton>
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

export default OAuthLoginModal;

interface LoginModalProps {
    onClose: () => void;
    onEmailLoginClick: () => void;
    onEmailSignupClick: () => void;  // 추가
}

const OrText = styled.span`
  margin: 20px 0;
  color: grey;
`;


const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 1.6rem; // 크기를 줄입니다.
  font-weight: 400;  // 굵기를 줄입니다.
`;


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

const OAuthButton = styled.button`
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #FFFFFF;
  border: 1px solid lightgray;
  border-radius: 5px;
  cursor: pointer;
  width: 300px; // 버튼의 가로 너비를 동일하게 설정합니다.
  display: flex;
  align-items: center;
  justify-content: center;
`;
const GoogleButton = styled(OAuthButton)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const KakaoButton = styled(OAuthButton)`
  display: flex;
  align-items: center;
  justify-content: center;
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


const LogoImage = styled.img`
  margin-right: 30px;
  width: 60px; // 로고의 가로 크기를 조정합니다. 필요에 따라 값을 조절할 수 있습니다.
  height: auto; // 가로 크기에 맞춰 세로 크기를 자동으로 조절합니다.
`;