
import React, { useState } from 'react';
import styled from 'styled-components';
import StockHolmLogo from "../asset/images/StockHolmLogo.png"



const Header: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <HeaderContainer>
      <LogoImage src={StockHolmLogo} />
      <SearchBar value={searchValue} onChange={handleSearchChange} />
      <LoginButton>{loginText}</LoginButton>
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
  border: 1px solid #2F4F4F; // 보라색 테두리
  padding: 0.5rem 1rem;
  border-radius: 5px; // 5px 둥글게
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f2f2f2; // 호버 시 약간 어두운 흰색으로 변경
  }
`;
  const loginText = "로그인";


export default Header;
