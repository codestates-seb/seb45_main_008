import React, { useState } from "react";
import styled from "styled-components";
import StockHolmLogo from "../../asset/images/StockHolmLogo.png";
import { useNavigate } from "react-router-dom";  // 라우터의 네비게이션을 사용하기 위해 가져옴

const LogoutHeader: React.FC<LogoutHeaderProps> = ({ onLoginClick }) => {
  const [searchValue, setSearchValue] = useState<string>("");  // 검색 값 상태 관리
  const navigate = useNavigate();  // 라우터 네비게이션 훅 사용

  // 검색 입력 변경 핸들러
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const loginText = "로그인";  // 로그인 버튼 텍스트

  // 로고 클릭 핸들러
  const handleLogoClick = () => {
    navigate("/");  // 메인 페이지로 이동
  };

  // 컴포넌트 렌더링
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

export default LogoutHeader;
// 프롭스 타입 정의
interface LogoutHeaderProps {
  onLoginClick: () => void;
}



// 스타일드 컴포넌트 정의
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #fff;
  border-bottom: 1px solid #2f4f4f;
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
  type: "text",
  placeholder: "검색...",
})`
  width: 50%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoginButton = styled.button`
  background-color: #fff;
  color: #2f4f4f;
  border: 1px solid #2f4f4f;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: #f2f2f2;
  }
`;


