import React from 'react';
import EntireList from './EntireList';
import HoldingList from '../HoldingList/HoldingList';
import WatchList from '../watchlist/WatchList';

interface ListSectionProps {
  selectedMenu: "전체종목" | "관심종목" | "보유종목";
  handleMenuChange: (menu: "전체종목" | "관심종목" | "보유종목") => void;
  openOAuthModal: () => void;
}

const ListSection: React.FC<ListSectionProps> = ({ selectedMenu, handleMenuChange, openOAuthModal }) => {
  if (selectedMenu === "전체종목") {
    return <EntireList currentListType={selectedMenu} onChangeListType={handleMenuChange} />;
  } else if (selectedMenu === "관심종목") {
    return <WatchList currentListType={selectedMenu} onChangeListType={handleMenuChange} openOAuthModal={openOAuthModal} />;
  } else if (selectedMenu === "보유종목") {
    return <HoldingList currentListType={selectedMenu} onChangeListType={handleMenuChange} openOAuthModal={openOAuthModal} />;
  } else {
    return null;
  }
}

export default ListSection;
