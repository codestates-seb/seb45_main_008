import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeCompanyId } from "../../reducer/CompanyId-Reducer";
import logo from "../../asset/images/StockHolmImage.png";

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
interface StockInfo {
  korName: string;
  companyId: string;
  stockInfResponseDto: {
    stck_prpr: string;
    prdy_ctrt: string;
    acml_vol: string;
  };
  code: string;
}
const MarketServerUrl =
  "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies";

const MarketStockList: React.FC = () => {
  const [marketStockList, setMarketStockList] = useState<StockInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

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

  const numberWithCommas = (x: number): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    MarketDataFromServer();
  }, []);

  const MarketDataFromServer = async () => {
    try {
      const response = await axios.get(MarketServerUrl);
      const marketListData = response.data;
      setMarketStockList(marketListData);
      setIsLoading(false);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  const SortName = () => {
    const sortedList = [...marketStockList];
    sortedList.sort((a, b) => a.korName.localeCompare(b.korName));
    setMarketStockList(sortedList);
    setSelectedSort("name");
  };

  const SortPrice = () => {
    const sortedList = [...marketStockList];
    sortedList.sort(
      (a, b) =>
        parseFloat(b.stockInfResponseDto.stck_prpr) -
        parseFloat(a.stockInfResponseDto.stck_prpr)
    );
    setMarketStockList(sortedList);
    setSelectedSort("price");
  };

  const SortRate = () => {
    const sortedList = [...marketStockList];
    sortedList.sort(
      (a, b) =>
        parseFloat(b.stockInfResponseDto.prdy_ctrt) -
        parseFloat(a.stockInfResponseDto.prdy_ctrt)
    );
    setMarketStockList(sortedList);
    setSelectedSort("rate");
  };

  const SortTrade = () => {
    const sortedList = [...marketStockList];
    sortedList.sort(
      (a, b) =>
        parseFloat(b.stockInfResponseDto.acml_vol) -
        parseFloat(a.stockInfResponseDto.acml_vol)
    );
    setMarketStockList(sortedList);
    setSelectedSort("trade");
  };

  const dispatch = useDispatch();

  return (
    <StockListContainer>
      <StockListTitle>
        <StockListDetail onClick={SortName} selected={selectedSort === "name"}>
          {MarketStockLists.stockName}
        </StockListDetail>
        <StockListDetail
          onClick={SortPrice}
          selected={selectedSort === "price"}
        >
          {MarketStockLists.stockPrice}
        </StockListDetail>
        <StockListDetail onClick={SortRate} selected={selectedSort === "rate"}>
          {MarketStockLists.stockRate}
        </StockListDetail>
        <StockListDetail
          onClick={SortTrade}
          selected={selectedSort === "trade"}
        >
          {MarketStockLists.stockTrade}
        </StockListDetail>
      </StockListTitle>
      <StockListHeader>
        <StockListHeaderItem1>순위</StockListHeaderItem1>
        <StockListHeaderItem2>종목명</StockListHeaderItem2>
        <StockListHeaderItem3>현재가(원)</StockListHeaderItem3>
        <StockListHeaderItem4>변동률(%)</StockListHeaderItem4>
        <StockListHeaderItem5>거래량(주)</StockListHeaderItem5>
      </StockListHeader>

      <StockInfoContainer>
        {marketStockList.slice(0, 10).map((el, index) => {
          const companyLogo = logos[el.korName] || logo;

          return (
            <div key={index}>
              <StockListInfo
                onClick={() => dispatch(changeCompanyId(el.companyId))}
              >
                {isLoading === true ? (
                  <div>{MarketStockLists.isLoading}</div>
                ) : (
                  <>
                    <RankingBadge rank={index + 1} />
                    <Logo src={companyLogo} alt="stock logo" />
                    <StockNameWrapper>
                      <StockName key={el.korName}>{el.korName}</StockName>
                      <StockCode key={el.code}>{el.code}</StockCode>
                    </StockNameWrapper>
                    <StockDetailWrapper>
                      <StockDetail>
                        <StockDetailItem key={el.stockInfResponseDto.stck_prpr}>
                          {numberWithCommas(
                            parseFloat(el.stockInfResponseDto.stck_prpr)
                          )}
                        </StockDetailItem>
                        <StockDetailItem
                          key={el.stockInfResponseDto.prdy_ctrt}
                          variation={
                            parseFloat(el.stockInfResponseDto.prdy_ctrt) > 0
                              ? "positive"
                              : parseFloat(el.stockInfResponseDto.prdy_ctrt) < 0
                              ? "negative"
                              : "neutral"
                          }
                        >
                          {el.stockInfResponseDto.prdy_ctrt}
                        </StockDetailItem>
                        <StockDetailItem key={el.stockInfResponseDto.acml_vol}>
                          {numberWithCommas(
                            parseFloat(el.stockInfResponseDto.acml_vol)
                          )}
                        </StockDetailItem>
                      </StockDetail>
                    </StockDetailWrapper>
                  </>
                )}
              </StockListInfo>
            </div>
          );
        })}
      </StockInfoContainer>
    </StockListContainer>
  );
};

export default MarketStockList;

const MarketStockLists = {
  stockName: "#종목명",
  stockPrice: "#현재가",
  stockRate: "#변동률",
  stockTrade: "#거래량",
  isLoading: "isLoading...",
};

const StockListContainer = styled.div`
  max-height: 285px;

  background-color: #f7f9fa;
  padding: 10px 10px;
  border-radius: 0px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StockListTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const StockListDetail = styled.div<{ selected?: boolean }>`
  flex: 1;
  text-align: center;
  padding: 8px 10px;
  font-size: 14px;
  color: ${({ selected }) => (selected ? "white" : "#4a6fa1")};
  background-color: ${({ selected }) => (selected ? "#4a6fa1" : "white")};
  border: ${({ selected }) => (selected ? "none" : "1px solid #4a6fa1")};
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: #3a5a8a;
    color: white;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const StockListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 10px; // padding을 추가하여 다른 컴포넌트와 정렬을 맞춰줍니다.
`;

const StockListHeaderItem1 = styled.div`
  flex: 0.7;
  text-align: center;
  font-size: 14px;
  color: slategray;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;
const StockListHeaderItem2 = styled.div`
  flex: 2;
  text-align: center;
  font-size: 14px;
  color: slategray;
  margin-right: 10px;

  &:last-child {
    margin-right: 0px;
  }
`;
const StockListHeaderItem3 = styled.div`
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: slategray;
  margin-right: 30px;

  &:last-child {
    margin-right: 0;
  }
`;
const StockListHeaderItem4 = styled.div`
  flex: 0.6;
  text-align: center;
  font-size: 14px;
  color: slategray;
  margin-right: 0px;

  &:last-child {
    margin-right: 0;
  }
`;

const StockListHeaderItem5 = styled.div`
  flex: 1.2;
  text-align: center;
  font-size: 14px;
  color: slategray;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

const StockInfoContainer = styled.div`
  width: 100%;
  height: calc(100vh - 266px);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const StockListInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
  &:hover {
    background-color: #e7e9ed;
  }
`;

const StockNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1.5;
  align-items: flex-start;
`;

const StockName = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #2b3d54;
`;

const StockCode = styled.div`
  color: gray;
  font-size: 12px;
  margin-top: 2px;
`;

const StockDetailWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 3;
  justify-content: space-between;
  align-items: center;
  padding-right: 10px;
`;

const StockDetail = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%; // 전체 너비 사용
  align-items: center;
`;

const StockDetailItem = styled.div<{
  variation?: "positive" | "neutral" | "negative";
}>`
  flex: 1;
  text-align: right;
  color: ${({ variation }) => {
    switch (variation) {
      case "positive":
        return "#e22926";
      case "negative":
        return "#2679ed";
      case "neutral":
      default:
        return "black";
    }
  }};
`;

const Logo = styled.img`
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin-right: 10px;
`;

const RankingBadge = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Medal>🥇</Medal>;
  if (rank === 2) return <Medal>🥈</Medal>;
  if (rank === 3) return <Medal>🥉</Medal>;
  return <Medal>{rank}</Medal>;
};

const Medal = styled.span`
  font-size: 20px;
  margin-right: 8px;
`;
