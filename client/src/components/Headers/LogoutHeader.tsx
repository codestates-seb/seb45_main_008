
import React, { useState } from 'react';
import styled from 'styled-components';
import StockHolmLogo from "../../asset/images/StockHolmLogo.png"

const LogoutHeader: React.FC<LogoutHeaderProps> = ({ onLoginClick })=> {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const loginText = "로그인";

  const handleLogoClick = () => {
    console.log("Logo clicked");
  };

  

  return (
    <HeaderContainer>
      <LogoButton onClick={handleLogoClick}>
        <LogoImage src={StockHolmLogo} />
      </LogoButton>
      <SearchBar value={searchValue} onChange={handleSearchChange} />
      <LoginButton onClick={onLoginClick}>{loginText}</LoginButton>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #2F4F4F; // 다크 슬레이트 그레이 줄
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

const LoginButton = styled.button`
  background-color: #fff; // 흰색 배경
  color: #2F4F4F; // 글자색
  border: 1px solid #2F4F4F; // 회색 테두리
  padding: 0.5rem 1rem;
  border-radius: 5px; // 5px 둥글게
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f2f2f2; // 호버 시 약간 어두운 흰색으로 변경
  }
`;
interface LogoutHeaderProps {
  onLoginClick: () => void;
}

export default LogoutHeader;
