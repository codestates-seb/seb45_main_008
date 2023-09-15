import React from 'react';
import styled from 'styled-components';
import Menu_icon from "../../asset/images/menu.png";

const ALL_LIST = "전체종목";
const INTEREST_LIST = "관심종목";
const HOLDING_LIST = "보유종목";

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
          <MenuItem onClick={() => { onChangeListType(ALL_LIST); setMenuOpen(false); }}>{ALL_LIST}</MenuItem>
          <MenuItem onClick={() => { onChangeListType(INTEREST_LIST); setMenuOpen(false); }}>{INTEREST_LIST}</MenuItem>
          <MenuItem onClick={() => { onChangeListType(HOLDING_LIST); setMenuOpen(false); }}>{HOLDING_LIST}</MenuItem>
        </SlideMenu>
      )}
    </HeaderWrapper>
  );
};

type HeaderProps = {
  currentListType: string;
  onChangeListType: (type: "전체종목" | "관심종목" | "보유종목") => void;
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.img`
  margin-top: 9.5px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 10px;
  margin-left:10px;
`;

const HeaderText = styled.span`
  margin-top: 9.5px;
  font-size: 18px;
`;

const SlideMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 248px;
  background-color: #f7f7f7;
  border: 1px solid #e0e0e0; /* 밑에 가로줄 추가 */
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
