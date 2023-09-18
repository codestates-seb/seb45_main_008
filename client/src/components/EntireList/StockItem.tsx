import React, { useState } from "react";
import styled from "styled-components";
import logo from "../../asset/images/StockHolmImage.png";

const StockItem: React.FC<StockItemProps> = ({ company }) => {
  const isPositiveChange = parseFloat(company.stockChangeRate) > 0;

  // 🔴 색깔 통일 (그냥 깔끔하게)
  const priceColor1 = isPositiveChange ? "#e22926" : "#2679ed";
  const priceColor2 = isPositiveChange ? "#e22926" : "#2679ed";
  // const priceColor2 = isPositiveChange ? "#fba89f" : "#a3c5f9";
  // const priceColor2 = isPositiveChange ? "#f87369" : "#5a99f8";

  const [showChangePrice, setShowChangePrice] = useState(false); // 상태를 여기로 이동

  // 🔴 회계 단위 추가
  const price = parseInt(company.stockPrice).toLocaleString();
  const changeAmout = parseInt(company.stockChangeAmount).toLocaleString();
  const priceUnit = "원";

  return (
    <StockItemWrapper
      onMouseEnter={() => setShowChangePrice(true)} // StockItemWrapper에 이벤트 리스너 적용
      onMouseLeave={() => setShowChangePrice(false)}
    >
      <LogoContainer>
        <Logo src={logo} alt="stock logo" />
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
  cursor: pointer;
`;

// 🔴 로고 컨테이너 + 로고 크기
const LogoContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled.img`
  border-radius: 50%;
  width: 28px;
  height: 28px;
  margin-left: 10px;
  margin-right: 10px;
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
