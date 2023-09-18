import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { setLoginState } from '../../reducer/member/loginSlice';  
import kakaoLogo from '../../asset/images/KakaoLogo.svg'; 

const KakaoLoginButton: React.FC<Props> = ({ backendURL }) => {
  const dispatch = useDispatch();

  const buttonText = "카카오로 로그인";

  // 버튼 클릭시 로그인 페이지로 리다이렉트
  const handleLoginClick = () => {
    window.location.href = `${backendURL}`;
    dispatch(setLoginState());  // 로그인 상태를 변경합니다.
  };

  return (
    <KakaoButton onClick={handleLoginClick}>
      <LogoImage src={kakaoLogo} alt="Kakao Logo" />
      {buttonText}
    </KakaoButton>
  );
}

export default KakaoLoginButton;

//변수 타입 선언
interface Props {
  backendURL: string;
}

// 카카오 버튼 스타일
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

  &:hover {
    background-color: #f2f2f2;  // 호버 시 밝은 회색 배경 적용
  }
`;

//카카오 로고 이미지 스타일
const LogoImage = styled.img`
  margin-right: 30px;
  width: 60px;
  height: auto;
`;


