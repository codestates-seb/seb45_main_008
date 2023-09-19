import React, { useState } from "react";
import styled from "styled-components";

import { useDispatch } from 'react-redux'; 
import { changeCompanyId } from "../../reducer/CompanyId-Reducer";

import logo from "../../asset/images/StockHolmImage.png";
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

const StockItem: React.FC<StockItemProps> = ({ company }) => {
  const isPositiveChange = parseFloat(company.stockChangeRate) > 0;

  // 이미 import된 로고들을 바탕으로 logos 객체 생성
  const logos: { [key: string]: string } = {
    삼성전자: logosamsung,
    POSCO홀딩스: posco,
    셀트리온: celltrion,
    에코프로: ecopro,
    에코프로비엠: ecoproBM,
    디와이: dy,
    쿠쿠홀딩스: kuckoo,
    카카오뱅크: kakaoBank,
    한세엠케이: hanse,
    KG케미칼: KG,
    LG화학: LGchem,
    현대차: hyundai,
    LG전자: LGelec,
    기아: kia,
  };
  // 그리고 나서, 이 `logos` 객체를 사용하여 기업명에 따라 적절한 로고를 선택할 수 있습니다.
  const companyLogo = logos[company.korName] || logo; // 기본 로고를 대체로 사용

  // 🔴 색깔 통일 (그냥 깔끔하게)
  const priceColor1 = isPositiveChange ? "#e22926" : "#2679ed";
  const priceColor2 = isPositiveChange ? "#e22926" : "#2679ed";
  // const priceColor2 = isPositiveChange ? "#fba89f" : "#a3c5f9";
  // const priceColor2 = isPositiveChange ? "#f87369" : "#5a99f8";

  const [showChangePrice, setShowChangePrice] = useState(false); // 상태를 여기로 이동
  const [isHovering, setIsHovering] = useState(false); // 마우스 호버 상태
  const { data: starredData } = useGetStar();
  const starredCompanyIds = starredData?.map(item => item.companyResponseDto.companyId) || [];

  // 해당 companyId가 이미 존재하는지 확인하고, isFavorited의 초기값을 설정합니다.
  const [isFavorited, setIsFavorited] = useState(starredCompanyIds.includes(company.companyId));

  // usePostStar 및 useDeleteStar 훅 사용
  const postMutation = usePostStar();
  const deleteMutation = useDeleteStar();

  const toggleFavorite = () => {
    // 현재 isFavorited 상태에 따라 요청을 결정합니다.
    if (isFavorited) {
      deleteMutation.mutate(company.companyId);
    } else {
      postMutation.mutate(company.companyId);
    }
    setIsFavorited(!isFavorited);
  };

  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(changeCompanyId(company.companyId));
  };

  // 🔴 회계 단위 추가
  const price = parseInt(company.stockPrice).toLocaleString();
  const changeAmout = parseInt(company.stockChangeAmount).toLocaleString();
  const priceUnit = "원";

  return (
    <StockItemWrapper
      onClick={handleItemClick} // 👈 클릭 이벤트 핸들러 추가
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
        <StockName>{company.korName}</StockName>
        <StockCode>{company.code}</StockCode>
      </StockInfo>
      <StockPriceSection>
        <StockPrice change={priceColor1}>
          {price} {priceUnit}
        </StockPrice>
        <StockChange change={priceColor2}>{showChangePrice ? `${changeAmout} ${priceUnit}` : `${company.stockChangeRate}%`}</StockChange>
      </StockPriceSection>
    </StockItemWrapper>
  );
};

type NewCompanyData = {
  companyId: number;
  code: string;
  korName: string;
  stockPrice: string;
  stockChangeAmount: string;
  stockChangeRate: string;
};

type StockItemProps = {
  company: NewCompanyData;
  setShowChangePrice: React.Dispatch<React.SetStateAction<boolean>>;
  showChangePrice: boolean;
};

// 🔴 높이 px로 고정
const StockItemWrapper = styled.div`
  display: flex;
  flex-direction: row; /* 수평으로 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: flex-start; /* 위로 정렬 */
  padding: 8px 0;
  border-bottom: 1px solid #e0e0e0;
  width: 100%;
  height: 57px;
  background-color: transparent;

  &:hover {
    background-color: #cee0ff;
    transition: background-color 0.5s ease;
  }
  cursor: pointer;
`;

// 🔴 로고 컨테이너 + 로고 크기
const LogoContainer = styled.div`
  height: 100%;
  width: 48px; // 아이콘의 너비와 margin-left, margin-right의 합계를 기준으로 설정
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Logo = styled.img<{ opacity: number }>`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin-left: 10px;
  margin-right: 10px;
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
  background-size: contain; // 👈 이 부분도 추가
`;


// 🔴 font 사이즈
const StockInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3px;
  margin-right: 16px;
`;

const StockName = styled.span`
  font-size: 15px;
  font-weight: 400;
`;

const StockCode = styled.span`
  /* color: gray; */
  /* color: #2f4f4f; */
  color: darkgray;
  font-weight: 400;
  font-size: 13px;
`;

const StockPriceSection = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-top: 3px;
  margin-left: auto; /* 자동으로 왼쪽 여백 추가 */
  margin-right: 10px;
`;

const StockPrice = styled.span<{ change: string }>`
  font-size: 15px;
  color: ${(props) => props.change};
`;

const StockChange = styled.span<{ change: string }>`
  color: ${(props) => props.change};
  cursor: pointer;

  font-size: 13px;
`;



export default StockItem;
