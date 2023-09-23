import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../asset/images/StockHolmImage.png";
import deleteIcon from "../../asset/icon/delete_icon.png";
import useDeleteStar from "../../hooks/stars/useDeletestars";
import { useDispatch } from "react-redux";
import { changeCompanyId } from "../../reducer/CompanyId-Reducer";

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

const StockItem: React.FC<StockItemProps> = ({ company, onDelete }) => {
  const [showChangePrice, setShowChangePrice] = useState(false);
  const isPositiveChange = parseFloat(company.stockChangeRate) > 0;
  // 🔴 색깔 통일 (그냥 깔끔하게)
  const priceColor1 = isPositiveChange ? "#e22926" : "#2679ed";
  const priceColor2 = isPositiveChange ? "#e22926" : "#2679ed";
  // const priceColor2 = isPositiveChange ? "#fba89f" : "#a3c5f9";
  // const priceColor2 = isPositiveChange ? "#f87369" : "#5a99f8";

  const [isHovered, setIsHovered] = useState(false); // 마우스 호버 상태
  const deleteMutation = useDeleteStar();

  const handleDelete: React.MouseEventHandler<HTMLImageElement> = (e) => {
    e.stopPropagation();
    deleteMutation.mutate(company.companyId, {
      onSuccess: () => {
        onDelete(company.companyId); // 콜백 함수 호출
      },
    });
  };

  const dispatch = useDispatch();

  const handleItemClick = () => {
    dispatch(changeCompanyId(company.companyId));
  };

  // 🔴 회계 단위 추가
  const price = parseInt(company.stockPrice).toLocaleString();
  const changeAmout = parseInt(company.stockChangeAmount).toLocaleString();
  const priceUnit = "원";

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

  return (
    <StockItemWrapper
      onClick={handleItemClick}
      onMouseEnter={() => {
        setShowChangePrice(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setShowChangePrice(false);
        setIsHovered(false);
      }}
    >
      <LogoContainer>
        <Logo src={companyLogo} alt="stock logo" isHovered={isHovered} />
        <DeleteIcon src={deleteIcon} alt="delete icon" isHovered={isHovered} onClick={handleDelete} />
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
export default StockItem;

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
  onDelete: (deletedCompanyId: number) => void;
};

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

const Logo = styled.img<{ isHovered: boolean }>`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin-left: 10px;
  margin-right: 10px;
  position: absolute;
  opacity: ${(props) => (props.isHovered ? 0 : 1)};
`;

const DeleteIcon = styled.img<{ isHovered: boolean }>`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin-left: 10px;
  margin-right: 10px;
  position: absolute;
  cursor: pointer;
  opacity: ${(props) => (props.isHovered ? 1 : 0)};
`;

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
