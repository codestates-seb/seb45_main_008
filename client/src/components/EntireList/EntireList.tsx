import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Header from "./Header";
import StockItem from "./StockItem";
import useCompanyData from "../../hooks/useCompanyData";
import { useSelector } from "react-redux"; // 👈 추가
import { StateProps } from "../../models/stateProps"; // 👈 추가
import useGetCash from "../../hooks/useGetCash";

const holdingAmountText = "보유 현금";
const amountUnit = "원";

const EntireList: React.FC<EntireListProps> = ({ currentListType, onChangeListType }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [showChangePrice, setShowChangePrice] = useState(false);

  // useCompanyData 훅 사용하여 데이터 가져오기
  const { data: companies, isLoading, isError } = useCompanyData(1, 14);

  // 'companies'가 'undefined'인 경우를 처리하기 위해 빈 배열로 초기화
  const companiesList = companies || [];

  // 로그인 상태 가져오기
  const isLogin = useSelector((state: StateProps) => state.login);

  // useGetCash 훅을 사용하여 현금 보유량 가져오기
  const { cashData: holdingsAmount } = useGetCash(); // 👈 useGetCash 훅을 사용하여 현금 보유량 데이터를 가져옵니다.

  // 🔴
  const [holdingCash, setHoldingCash] = useState("");

  useEffect(() => {
    if (holdingsAmount) {
      const holdingCash = holdingsAmount.toLocaleString();
      setHoldingCash(holdingCash);
    }
  }, [holdingsAmount]);
  // 🔴

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
      <WatchListContainer>
        <Header1Container>
          <Header currentListType={currentListType} onChangeListType={onChangeListType} isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        </Header1Container>
        <Header2Container isLogin={isLogin}>
          <HoldingsAmount isLogin={isLogin}>
            {isLogin === 1 && (
              <>
                <div className="amountText">{holdingAmountText}</div>
                <div className="amount">
                  {holdingCash} {amountUnit}
                </div>
              </>
            )}
          </HoldingsAmount>
        </Header2Container>
        <StockList>
          {isLoading ? <div></div> : isError ? <div>Error fetching data</div> : companiesList.map((company) => <StockItem key={company.companyId} company={company} setShowChangePrice={setShowChangePrice} showChangePrice={showChangePrice} />)}
        </StockList>
      </WatchListContainer>
    </motion.div>
  );
};

export default EntireList;

// Props와 상태에 대한 타입 정의
type EntireListProps = {
  currentListType: "전체종목" | "관심종목" | "보유종목";
  onChangeListType: (type: "전체종목" | "관심종목" | "보유종목") => void;
};

// WatchList 컴포넌트에 대한 스타일드 컴포넌트 정의
const WatchListContainer = styled.div`
  height: calc(100vh - 53px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Header1Container = styled.div`
  // 🔴
  width: 100%;
  height: 48px;
  display: flex;
`;

const Header2Container = styled.div<{ isLogin: number }>`
  // 🔴
  width: 100%;
  height: ${(props) => (props.isLogin === 0 ? "0px" : "43.5px")};
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: ${(props) => (props.isLogin === 0 ? "" : "1px solid black")};
`;

// 🔴
// const Divider = styled.div`
//   width: 100%;
//   display: flex;
//   flex-direction: row;
//   /* border-bottom: 1px solid #2f4f4f; */
// `;

const HoldingsAmount = styled.div<{ isLogin: number }>`
  // 🔴
  width: 100%;
  height: 100%;
  display: ${(props) => (props.isLogin === 0 ? "none" : "flex")};
  flex-direction: row;
  padding-left: 14px;
  align-items: center;
  gap: 6.5px;
  font-size: 0.95em;
  font-weight: 570;
  color: black;

  .amount {
    color: #2f4f4f;
  }
`;

const StockList = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다 */

  &::-webkit-scrollbar {
    display: none;
  }
`;
