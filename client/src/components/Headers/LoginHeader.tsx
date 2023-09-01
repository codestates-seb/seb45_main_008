import React, { useState } from 'react';
import styled from 'styled-components';
import StockHolmLogo from "../../asset/images/StockHolmLogo.png";
import SampleProfile from "../../asset/images/ProfileSample.png"; 
import AlarmImage from "../../asset/images/alarm.png"; 

const LoginHeader: React.FC<LoginHeaderProps> = ({ onLogoutClick }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const logoutText = "로그아웃";

  const handleLogoClick = () => {
    console.log("Logo clicked");
  };

  return (
    <HeaderContainer>
      <LogoButton onClick={handleLogoClick}>
        <LogoImage src={StockHolmLogo} />
      </LogoButton>
      <SearchBar value={searchValue} onChange={handleSearchChange} />
      <UserActions>
        <NotificationButton> 
          <img src={AlarmImage} alt="Notification" /> 
        </NotificationButton>
        <ProfileButton>
          <ProfileImage src={SampleProfile} />
        </ProfileButton>
        <LogoutButton onClick={onLogoutClick}>{logoutText}</LogoutButton>  {/* 로그아웃 버튼 클릭 시 onLogoutClick 실행 */}
      </UserActions>
    </HeaderContainer>
  );
};

export default LoginHeader;

interface LoginHeaderProps {
  onLogoutClick: () => void;  // 로그아웃 클릭 핸들러 타입 정의
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem ;
  background-color: #fff;
  border-bottom: 1px solid #2F4F4F; 
  width: 100%;
  height: 51px;
`;

const LogoButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:focus {
    outline: none;
  }
`;

const LogoImage = styled.img`
  height: 40px;
  width: auto;
`;

const SearchBar = styled.input.attrs({
  type: 'text',
  placeholder: '검색...'
})`
  width: 50%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
`;

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

const ProfileButton = styled.button`
  margin-right: 1rem;
  background-color: transparent; // You can adjust this color if needed
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const ProfileImage = styled.img`
  height: 40px;
  width: auto;
`;


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



