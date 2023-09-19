import React from "react";
import styled from "styled-components";
import Menu_icon from "../../asset/images/menu.png";

const ALL_LIST = "전체종목";
const INTEREST_LIST = "관심종목";
const HOLDING_LIST = "보유종목";

const Header: React.FC<HeaderProps> = ({ currentListType, onChangeListType, isMenuOpen, setMenuOpen }) => {
  return (
    <HeaderWrapper>
      <Icon src={Menu_icon} alt="menu icon" onClick={() => setMenuOpen(!isMenuOpen)} />
      <HeaderText>{currentListType}</HeaderText>
      {isMenuOpen && (
        <SlideMenu>
          <MenuItem
            onClick={() => {
              onChangeListType(ALL_LIST);
              setMenuOpen(false);
            }}
          >
            {ALL_LIST}
          </MenuItem>
          <MenuItem
            onClick={() => {
              onChangeListType(INTEREST_LIST);
              setMenuOpen(false);
            }}
          >
            {INTEREST_LIST}
          </MenuItem>
          <MenuItem1
            onClick={() => {
              onChangeListType(HOLDING_LIST);
              setMenuOpen(false);
            }}
          >
            {HOLDING_LIST}
          </MenuItem1>
        </SlideMenu>
      )}
    </HeaderWrapper>
  );
};

export default Header;

type HeaderProps = {
  currentListType: string;
  onChangeListType: (type: "전체종목" | "관심종목" | "보유종목") => void;
  isMenuOpen: boolean;
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeaderWrapper = styled.div`
  height: 43px;
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
  margin-right: 10px;
  margin-left: 10px;
`;

const HeaderText = styled.span`
  margin-top: 2px;
  font-size: 18px;
`;

const SlideMenu = styled.div`
  z-index:30;
  position: absolute;
  top: 100%;
  left: 0;
  width: 247px;
  background-color: #f7f7f7;
  border-top: 1px solid black;
  border-right: 1px solid black;
  border-left: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.button`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border: none;
  background-color: white;
  cursor: pointer;
  text-align: left;
  border-bottom: 1px solid black;
  font-size: 15.5px;

  &:hover {
    background-color: #f2f2f2;
    color: darkslategray;
  }
`;
const MenuItem1 = styled(MenuItem)`
  border-left: 4px solid darkslategray;
`;
