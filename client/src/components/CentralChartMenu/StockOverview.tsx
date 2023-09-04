import { styled } from "styled-components";

// dummyData
import { dummyData } from "./dummyData";

const marketType: string = "코스피";
const volumeText: string = "거래량";
const valueText: string = "거래대금";

// styled-component 수정 및 미디어 쿼리 적용
const StockOverview = () => {
  return (
    <Container>
      <img className="CorpLogo" src={dummyData.corpLogo} />
      <div className="CorpName">{dummyData.corpName}</div>
      <div className="StockCode">
        {dummyData.stockCode} <span>{marketType}</span>
      </div>
      <div className="StockPrice">{dummyData.stockPrice}</div>
      <div className="PriceChangeRate">{dummyData.changeRate}</div>
      <div className="PriceChangeAmount">{dummyData.changeAmount}</div>
      <TransactionVolume>
        <span>{volumeText}</span>
        {dummyData.totalVolume}
      </TransactionVolume>
      <TransactionValue>
        <span>{valueText}</span>
        {dummyData.totalValue}
      </TransactionValue>
    </Container>
  );
};

export default StockOverview;

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
