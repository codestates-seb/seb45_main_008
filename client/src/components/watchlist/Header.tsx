import React from 'react';
import styled from 'styled-components';
import Menu_icon from "../../asset/images/menu.png";

const INTEREST_LIST = "관심목록";
const INVESTMENT_LIST = "투자목록";

// Header 컴포넌트는 다음과 같은 기능을 수행합니다.
// 1. 메뉴 아이콘과 현재 리스트 타입을 표시합니다.
// 2. 메뉴 아이콘을 클릭하면 메뉴의 열림/닫힘 상태를 토글합니다.
// 3. 메뉴가 열려 있으면 SlideMenu를 통해 관심목록과 투자목록을 선택할 수 있습니다.

const Header: React.FC<HeaderProps> = ({ currentListType, onChangeListType, isMenuOpen, setMenuOpen }) => {
    return (
        <HeaderWrapper>
          <Icon 
            src={Menu_icon}
            alt="menu icon"
            onClick={() => setMenuOpen(!isMenuOpen)}
          />
          <HeaderText>{currentListType}</HeaderText>
          {isMenuOpen && (
            <SlideMenu>
              <MenuItem onClick={() => { onChangeListType(INTEREST_LIST); setMenuOpen(false); }}>{INTEREST_LIST}</MenuItem>
              <MenuItem onClick={() => { onChangeListType(INVESTMENT_LIST); setMenuOpen(false); }}>{INVESTMENT_LIST}</MenuItem>
            </SlideMenu>
          )}
        </HeaderWrapper>
      );
    };

// HeaderProps는 Header 컴포넌트가 받을 props의 타입을 정의합니다.
type HeaderProps = {
    currentListType: string;
    onChangeListType: (type: "관심목록" | "투자목록") => void;
    isMenuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    
  };
  

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 10px;
`;

const HeaderText = styled.span`
  font-size: 18px;
`;

const SlideMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 248px;
  background-color: #f7f7f7;
  border: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.button`
  padding: 8px 16px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  text-align: left;
`;

export default Header;
