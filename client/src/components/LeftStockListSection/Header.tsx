import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import menuIcon from "../../asset/images/menu.png";
import { StateProps } from "../../models/stateProps";
import { setStockListType } from "../../reducer/LeftStockList-Reducer";

const stockList = ["전체종목", "관심종목", "보유종목"];

const Header = () => {
  const dispatch = useDispatch();
  const [listMenu, setListMenu] = useState(false);
  const [menuTitle, setMenuTitle] = useState(stockList[0]);
  const stockListType = useSelector((state: StateProps) => state.leftStockListType);

  const handleSetMenuOnOff = () => {
    setListMenu(!listMenu);
  };

  const handleChangeMenu = (menuTitle: string, menuTypeNum: number) => {
    setMenuTitle(menuTitle);
    dispatch(setStockListType(menuTypeNum));
    handleSetMenuOnOff();
  };

  return (
    <HeaderWrapper>
      <Icon src={menuIcon} alt="menu icon" onClick={handleSetMenuOnOff} />
      <HeaderText>{menuTitle}</HeaderText>
      {listMenu && (
        <SlideMenu>
          {stockList.map((menuType, index) => (
            <MenuItem key={menuType} onClick={() => handleChangeMenu(menuType, index)} stockListType={stockListType} index={index}>
              {menuType}
            </MenuItem>
          ))}
        </SlideMenu>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 100%;
  height: 44px;
  border-bottom: 1px solid black;
`;

const Icon = styled.img`
  margin: 0px 10px 0px 10px;
  width: 24px;
  height: 24px;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const HeaderText = styled.span`
  margin-top: 2px;
  font-size: 18px;
`;

const SlideMenu = styled.div`
  z-index: 30;
  position: absolute;
  top: 100%;
  left: 0;
  width: 247px;
  background-color: #f7f7f7;
  border-top: 1px solid black;
  border-left: 1px solid black;
  display: flex;
  flex-direction: column;
`;

const MenuItem = styled.button<{ stockListType: number; index: number }>`
  height: 40px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  border: none;
  background-color: white;
  text-align: left;
  font-size: 15.5px;
  cursor: pointer;
  border-bottom: 1px solid black;
  border-left: ${(props) => props.stockListType === props.index && "4px solid #4479c2"};

  &:hover {
    background-color: #f2f2f2;
    color: darkslategray;
  }
`;

export default Header;
