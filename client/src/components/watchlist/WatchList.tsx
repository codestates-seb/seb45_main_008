import React, { useState } from 'react';
import styled from 'styled-components';
import Header from './Header';
import StockItem from './StockItem';

type WatchListProps = {
  currentListType: "관심목록" | "투자목록";
  onChangeListType: (type: "관심목록" | "투자목록") => void;
};

const WatchList: React.FC<WatchListProps> = ({ currentListType, onChangeListType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showChangePrice, setShowChangePrice] = useState(false);

  // Sample stocks data
  const stocks = [
    {
      name: '삼성전자',
      code: '005930',
      price: '57800',
      change: '+0.67%',
      changePrice: '+380',
      logo: 'https://your_logo_url.com'
    },
    {
      name: '현대차',
      code: '005380',
      price: '205000',
      change: '-0.24%',
      changePrice: '-500',
      logo: 'https://your_logo_url.com'
    },
  ];

  return (
    <WatchListContainer>
      <Header 
        currentListType={currentListType} 
        onChangeListType={onChangeListType} 
        isMenuOpen={isMenuOpen} 
        setMenuOpen={setMenuOpen}
      />
      <StockList>
        {stocks.map((stock, index) => (
          <StockItem 
            key={index} 
            stock={stock} 
            setShowChangePrice={setShowChangePrice} 
            showChangePrice={showChangePrice}
          />
        ))}
      </StockList>
    </WatchListContainer>
  );
};

const WatchListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StockList = styled.div`
  width: 100%;
`;

export default WatchList;
