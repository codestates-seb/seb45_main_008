
import React, { useState } from 'react';
import styled from 'styled-components';
import StockHolmLogo from "../../asset/images/StockHolmLogo.png";
import SampleProfile from "../../asset/images/ProfileSample.png"; 
import { useNavigate } from "react-router-dom";  
import AlarmImage from "../../asset/images/alarm.png"; 
import ProfileModal from "../Profile/profileModal";
import StockSearchComponent from './stockSearchComponent';
import { setLogoutState } from '../../reducer/member/loginSlice';
import { useDispatch } from 'react-redux';


// 로그인 상태일 때의 헤더 컴포넌트
const LoginHeader: React.FC<LoginHeaderProps> = () => {
  const [isProfileModalOpen, setProfileModalOpen] = useState(false); // 프로필 모달 상태
  const navigate = useNavigate();  // 페이지 이동 함수
  const logoutText = "로그아웃";
  const dispatch = useDispatch();  // 👈 useDispatch hook 추가

  // 프로필 모달 열기 함수
  const handleProfileOpen = () => {
    setProfileModalOpen(true);
  };

  // 프로필 모달 닫기 함수
  const handleProfileClose = () => {
    setProfileModalOpen(false);
  };

  // 로고 클릭 처리 함수
  const handleLogoClick = () => {
    navigate("/");  // 메인 페이지로 이동
  };

  const handleLogout = () => {
    dispatch(setLogoutState()); // 전역변수에서 로그아웃 상태로 설정
    localStorage.removeItem("Authorization"); // 엑세스 토큰 제거
    localStorage.removeItem("Refresh-token"); // 리프레시 토큰 제거
};

  return (
    <HeaderContainer>
      <LogoButton onClick={handleLogoClick}>
        <LogoImage src={StockHolmLogo} />
      </LogoButton>
      {/* <SearchBar value={searchValue} onChange={handleSearchChange} /> */}
      <StockSearchComponent/>
      <UserActions>
        <NotificationButton> 
          <img src={AlarmImage} alt="Notification" />
        </NotificationButton>
        <ProfileButton onClick={handleProfileOpen}>
          <ProfileImage src={SampleProfile} />
        </ProfileButton>
        {isProfileModalOpen && <ProfileModal onClose={handleProfileClose} />}
        <LogoutButton onClick={handleLogout}>{logoutText}</LogoutButton>
      </UserActions>
    </HeaderContainer>
  );
};

export default LoginHeader;

// 로그아웃 클릭 이벤트 타입 정의
interface LoginHeaderProps {
  onProfileClick: () => void;
}

// 헤더 컨테이너 스타일
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #2F4F4F; 
  width: 100%;
  height: 51px;
`;

// 로고 버튼 스타일
const LogoButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  &:focus {
    outline: none;
  }
`;

// 로고 이미지 스타일
const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;


// 사용자 액션 버튼들의 스타일
const UserActions = styled.div`
  display: flex;
  align-items: center;
`;

// 알림 버튼 스타일
const NotificationButton = styled.button`
  margin-right: 1rem; 
  background-color: #fff;
  border: none;
  cursor: pointer;
  img {   
    height: 40px;
    width: auto;
  }
`;

// 프로필 버튼 스타일
const ProfileButton = styled.button`
  margin-right: 1rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  &:focus {
    outline: none;
  }
`;

// 프로필 이미지 스타일
const ProfileImage = styled.img`
  height: 40px;
  width: auto;
`;

// 로그아웃 버튼 스타일
const LogoutButton = styled.button`
  background-color: #fff;
  color: #2F4F4F; 
  border: 1px solid #2F4F4F; 
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f2f2f2; 
  }
`;


