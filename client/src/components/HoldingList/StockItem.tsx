import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../asset/images/StockHolmImage.png";
import { useDispatch } from 'react-redux';
import { changeCompanyId } from "../../reducer/CompanyId-Reducer";

import star_icon from "../../asset/icon/star_icon.png"
import star_filled_icon from "../../asset/icon/star_filled_icon.png"

import usePostStar from "../../hooks/stars/usePoststars";
import useDeleteStar from "../../hooks/stars/useDeletestars";
import useGetStar from "../../hooks/stars/useGetstars";

import kia from "../../asset/logos/기아.svg";
import dy from "../../asset/logos/디와이.jpeg";
import logosamsung from "../../asset/logos/삼성전자.svg";
import celltrion from "../../asset/logos/셀트리온.svg";
import ecopro from "../../asset/logos/에코프로.jpeg";
import ecoproBM from "../../asset/logos/에코프로비엠.svg";
import kakaoBank from "../../asset/logos/카카오뱅크.svg";
import kuckoo from "../../asset/logos/쿠쿠홀딩스.jpeg";
import hanse from "../../asset/logos/한세엠케이.jpeg";
import hyundai from "../../asset/logos/현대차.svg";
import KG from "../../asset/logos/KG케미칼.png";
import LGelec from "../../asset/logos/LG전자.svg";
import LGchem from "../../asset/logos/LG화학.svg";
import posco from "../../asset/logos/POSCO홀딩스.svg";

export type StockItemProps = {
  stockData: {
    stockHoldId: number;
    memberId: number;
    companyId: number;
    companyKorName: string;
    stockCount: number;
    totalPrice: number;
    percentage: number;
    stockReturn: number;
    reserveSellStockCount: number;
  };
  companyData?: {
    companyId: number;
    code: string;
    korName: string;
    stockPrice: string;
    stockChangeAmount: string;
    stockChangeRate: string;
  };
  setShowChangePrice: (value: boolean) => void;
  showChangePrice: boolean;
};

const StockItem: React.FC<StockItemProps> = ({ companyData, stockData }) => {
  const [showChangePrice, setShowChangePrice] = useState(false); // local state
  const { stockCount, reserveSellStockCount, totalPrice, percentage, stockReturn } = stockData;
  const totalStocksHeld = stockCount + reserveSellStockCount;
  const company = companyData ? companyData : undefined;

  const { code = "", korName = "", stockPrice = "", stockChangeAmount = "", stockChangeRate = "" } = company || {};
  const price = parseInt(stockPrice);
  const priceChangeAmount = parseInt(stockChangeAmount);

  // Format percentage to two decimal places
  const formattedPercentage = parseFloat(percentage.toFixed(2));


    // 이미 import된 로고들을 바탕으로 logos 객체 생성
  const logos: { [key: string]: string } = {
      '삼성전자': logosamsung,
      'POSCO홀딩스': posco,
      '셀트리온': celltrion,
      '에코프로': ecopro,
      '에코프로비엠': ecoproBM,
      '디와이': dy,
      '쿠쿠홀딩스': kuckoo,
      '카카오뱅크': kakaoBank,
      '한세엠케이': hanse,
      'KG케미칼': KG,
      'LG화학': LGchem,
      '현대차': hyundai,
      'LG전자': LGelec,
      '기아': kia,
      };
  // 그리고 나서, 이 `logos` 객체를 사용하여 기업명에 따라 적절한 로고를 선택할 수 있습니다.
  const companyLogo = company ? logos[company.korName] || logo : logo; // 기본 로고를 대체로 사용

  const [isHovering, setIsHovering] = useState(false); // 마우스 호버 상태
    
  const { data: starredData } = useGetStar();
  const starredCompanyIds = starredData?.map(item => item.companyResponseDto.companyId) || [];

  // 해당 companyId가 이미 존재하는지 확인하고, isFavorited의 초기값을 설정합니다.
  const [isFavorited, setIsFavorited] = useState(starredCompanyIds.includes(stockData.companyId));

  // usePostStar 및 useDeleteStar 훅 사용
  const postMutation = usePostStar();
  const deleteMutation = useDeleteStar();

  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(changeCompanyId(stockData.companyId));
  };

  

  const toggleFavorite = () => {
    // 현재 isFavorited 상태에 따라 요청을 결정합니다.
    if (isFavorited) {
      deleteMutation.mutate(stockData.companyId);
    } else {
      postMutation.mutate(stockData.companyId);
    }
    setIsFavorited(!isFavorited);
  };


  return (
    <EntireContainer>
      <ItemContainer
        onClick={handleItemClick}
        onMouseEnter={() => {
          setShowChangePrice(true);
          setIsHovering(true);
        }}
        onMouseLeave={() => {
          setShowChangePrice(false);
          setIsHovering(false);
        }}
      >
        <LogoContainer>
          <Logo src={companyLogo} alt="stock logo" opacity={isHovering ? 0 : 1} />
          <FavoriteStar onClick={toggleFavorite} opacity={isHovering && !isFavorited ? 1 : 0} />
          <FavoriteStarFilled onClick={toggleFavorite} opacity={isHovering && isFavorited ? 1 : 0} />
        </LogoContainer>
        <StockInfo>
          <StockName>{korName}</StockName>
          <StockCode>{code}</StockCode>
        </StockInfo>
        <StockPriceSection>
          <StockPrice priceChangeAmount={priceChangeAmount}>{price.toLocaleString()} 원</StockPrice>
          <StockChange priceChangeAmount={priceChangeAmount} onMouseEnter={() => setShowChangePrice(true)} onMouseLeave={() => setShowChangePrice(false)}>
            {showChangePrice ? `${priceChangeAmount.toLocaleString()} 원` : `${stockChangeRate}%`}
          </StockChange>
        </StockPriceSection>
      </ItemContainer>
      <StockDetails>
        <DetailSection01>
          <DetailTitle>수익</DetailTitle>
          <DetailTitle>보유</DetailTitle>
        </DetailSection01>
        <DetailSection02>
          <ColoredDetailData priceChangeAmount={priceChangeAmount}>{stockReturn.toLocaleString()} 원</ColoredDetailData>
          <DetailData>{totalPrice.toLocaleString()} 원</DetailData>
        </DetailSection02>
        <DetailSection03>
          <ColoredDetailData priceChangeAmount={priceChangeAmount}>{formattedPercentage}%</ColoredDetailData>
          <DetailTitle>{totalStocksHeld}주</DetailTitle>
        </DetailSection03>
      </StockDetails>
      {/* <ThickDivider /> */}
    </EntireContainer>
  );
};

export default StockItem;

const EntireContainer = styled.div`
  &:hover {
    background-color: #d9e6ff;
    transition: background-color 0.5s ease;

    cursor: pointer;
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  /* gap: 8px; */
  width: 100%;
  padding: 12px 0;
  border-bottom: 1px solid #e0e0e0; // Holdings에서의 스타일 추가
`;

const LogoContainer = styled.div`
  flex: 1 0 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin: 10px; */
  padding-left: 12px;
  /* padding-right: 5px/; */
`;

const Logo = styled.img<{ opacity: number }>`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  position: absolute;
  opacity: ${(props) => props.opacity};
`;

const FavoriteStar = styled.div<{ opacity: number }>`
  position: absolute;
  width: 28px;
  height: 28px;
  background: url(${star_icon}) no-repeat center;
  background-size: contain;
  cursor: pointer;
  opacity: ${(props) => props.opacity};
`;

const FavoriteStarFilled = styled(FavoriteStar)<{ opacity: number }>`
  background: url(${star_filled_icon}) no-repeat center;
  background-size: contain;
`;







const StockInfo = styled.div`
  flex: 5 0 0;
  height: 100%;
  padding-top: 3px;
  padding-left: 6px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const StockName = styled.span`
  font-size: 15px;
  font-weight: 400;
`;

const StockCode = styled.span`
  color: darkgray;
  font-weight: 400;
  font-size: 13px;
`;

const StockPriceSection = styled.div`
  flex: 5 0 0;
  padding-top: 3px;
  margin-left: auto; /* 자동으로 왼쪽 여백 추가 */
  /* margin-right: 10px; */
  padding-right: 12px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

// const getColorByChange = (change: string) => {
//   if (change.startsWith("")) return "red";
//   if (change.startsWith("-")) return "blue";
//   return "black";
// };

const StockPrice = styled.span<{ priceChangeAmount: number }>`
  color: ${(props) => (props.priceChangeAmount > 0 ? "#e22926" : "#2679ed")};
  font-size: 15px;
`;

const StockChange = styled.span<{ priceChangeAmount: number }>`
  color: ${(props) => (props.priceChangeAmount > 0 ? "#e22926" : "#2679ed")};
  font-size: 13px;
  cursor: pointer;
`;

const StockDetails = styled.div`
  display: flex;
  /* justify-content: space-between; */
  /* gap: 15px; */
  /* padding: 8px 0; */
  align-items: center;
  padding-top: 11px;
  padding-bottom: 11px;
  border-bottom: 1px solid darkgray;
  width: 100%;
`;

const DetailSection01 = styled.div`
  flex: 1.4 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 12px;
  gap: 2px;
  /* padding-right: 10px; */
`;

const DetailSection02 = styled.div`
  flex: 4 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  /* align-items: center; */
  justify-content: center;
  gap: 2px;
  padding-left: 3px;
  /* padding-right: 10px; */
`;

const DetailSection03 = styled.div`
  flex: 4 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  padding-left: 10px;
  padding-right: 12px;
`;

const DetailTitle = styled.span`
  font-weight: light;
  /* font-weight: 420; */
  font-size: 14px;
`;

const DetailData = styled.span`
  font-size: 14px; // Setting standardized font size for all data
`;

const ColoredDetailData = styled.span<{ priceChangeAmount: number }>`
  color: ${(props) => (props.priceChangeAmount > 0 ? "#e22926" : "#2679ed")};
  font-size: 14px;
`;
