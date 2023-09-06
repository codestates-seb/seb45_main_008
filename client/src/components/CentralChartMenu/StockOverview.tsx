import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import { StateProps } from "../../models/stateProps";

// dummyData
import { dummyData } from "./dummyData";

const marketType: string = "코스피";
const volumeText: string = "거래량";
const valueText: string = "거래대금";

// styled-component 수정 및 미디어 쿼리 적용
const StockOverview = () => {
  const [stockInfo, setStockInfo] = useState<StockOverviewProps>(inintialState);
  const companyId = useSelector((state: StateProps) => state.companyId);
  const { data, isLoading, error } = useGetStockInfo(companyId);

  useEffect(() => {
    if (data) {
      setStockInfo(data);
    }
  }, [data]);

  if (isLoading) {
    return <p>로딩 중 입니다</p>;
  }

  if (error) {
    return <p>에러 발생</p>;
  }

  return (
    <Container>
      <img className="CorpLogo" src={dummyData.corpLogo} />
      <div className="CorpName">{stockInfo.korName}</div>
      <div className="StockCode">
        {stockInfo.code} <span>{marketType}</span>
      </div>
      <div className="StockPrice">{stockInfo.stockInfResponseDto.stck_prpr}</div>
      <div className="PriceChangeRate">{stockInfo.stockInfResponseDto.prdy_vrss}</div>
      <div className="PriceChangeAmount">{stockInfo.stockInfResponseDto.prdy_ctrt}</div>
      <TransactionVolume>
        <span>{volumeText}</span>
        {stockInfo.stockInfResponseDto.acml_vol}
      </TransactionVolume>
      <TransactionValue>
        <span>{valueText}</span>
        {stockInfo.stockInfResponseDto.acml_tr_pbmn}
      </TransactionValue>
    </Container>
  );
};

export default StockOverview;

// 상태 초기값
const inintialState = {
  companyId: 0,
  code: "",
  korName: "",
  stockAsBiResponseDto: {
    stockAsBiId: 0,
    companyId: 0,
    askp1: "",
    askp2: "",
    askp3: "",
    askp4: "",
    askp5: "",
    askp_rsqn1: "",
    askp_rsqn2: "",
    askp_rsqn3: "",
    askp_rsqn4: "",
    askp_rsqn5: "",
    bidp1: "",
    bidp2: "",
    bidp3: "",
    bidp4: "",
    bidp5: "",
    bidp_rsqn1: "",
    bidp_rsqn2: "",
    bidp_rsqn3: "",
    bidp_rsqn4: "",
    bidp_rsqn5: "",
  },
  stockInfResponseDto: {
    stockInfId: 0,
    companyId: 0,
    stck_prpr: "",
    prdy_vrss: "",
    prdy_ctrt: "",
    acml_vol: "",
    acml_tr_pbmn: "",
  },
};

// type 정의
interface StockOverviewProps {
  companyId: number;
  code: string;
  korName: string;
  stockAsBiResponseDto: StockPriceProps;
  stockInfResponseDto: StockInfoProps;
}

interface StockPriceProps {
  stockAsBiId: number;
  companyId: number;
  askp1: string;
  askp2: string;
  askp3: string;
  askp4: string;
  askp5: string;
  askp_rsqn1: string;
  askp_rsqn2: string;
  askp_rsqn3: string;
  askp_rsqn4: string;
  askp_rsqn5: string;
  bidp1: string;
  bidp2: string;
  bidp3: string;
  bidp4: string;
  bidp5: string;
  bidp_rsqn1: string;
  bidp_rsqn2: string;
  bidp_rsqn3: string;
  bidp_rsqn4: string;
  bidp_rsqn5: string;
}

interface StockInfoProps {
  stockInfId: number;
  companyId: number;
  stck_prpr: string;
  prdy_vrss: string;
  prdy_ctrt: string;
  acml_vol: string;
  acml_tr_pbmn: string;
}

// component 생성
const Container = styled.div`
  flex: 7 0 0;
  overflow-x: scroll;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  gap: 8px;

  &::-webkit-scrollbar {
    display: none;
  }

  .CorpLogo {
    width: 24px;
    height: 24px;
    border-radius: 50%;
  }

  .CorpName {
    white-space: nowrap;
    min-width: min-content;
    font-size: 18px;
    font-weight: 530;
  }

  .StockCode {
    white-space: nowrap;
    min-width: min-content;
    font-size: 14px;
    color: #999999;
  }

  .StockPrice {
    font-size: 18px;
    color: #ed2926;
    font-weight: 530;
  }

  .PriceChangeRate,
  .PriceChangeAmount {
    font-size: 14px;
    color: #ed2926;
  }
`;

const TransactionVolume = styled.div`
  white-space: nowrap;
  min-width: min-content;
  font-size: 14px;
  color: #525252;

  & span {
    color: #999999;
    padding-right: 5px;
  }
`;

const TransactionValue = styled(TransactionVolume)``;
