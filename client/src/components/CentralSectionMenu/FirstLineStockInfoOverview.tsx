import { styled } from "styled-components";

// dummyData -> 일부 재활용 예정 (변수명 다시 생각)
import dummyImg from "../../asset/CentralSectionMenu-dummyImg.png";
const corpName: string = "카카오";
const stockCode: string = "035720";
const stockCodeAdditionalInfo: string = "코스피";
const stockPrice: string = "48,600";
const changeRate: string = "+1.25%";
const chageAmount: string = "▲600";
const transactionVolume: string = "864,728";
const volumeAdditionalInfo: string = "거래량";
const transactionValue: string = "419억 1,468만";
const valueAdditionalInfo: string = "거래대금";

const StockInfoOverview = () => {
  return (
    <Container>
      <CorpLogo src={dummyImg} />
      <CorpName>{corpName}</CorpName>
      <StockCode>
        {stockCode} <span>{stockCodeAdditionalInfo}</span>
      </StockCode>
      <StockPrice>{stockPrice}</StockPrice>
      <PriceChangeRate>{changeRate}</PriceChangeRate>
      <PriceChangeAmount>{chageAmount}</PriceChangeAmount>
      <TransactionVolume>
        <span>{volumeAdditionalInfo}</span>
        {transactionVolume}
      </TransactionVolume>
      <TransactionValue>
        <span>{valueAdditionalInfo}</span>
        {transactionValue}
      </TransactionValue>
    </Container>
  );
};

export default StockInfoOverview;

const Container = styled.div`
  flex: 7 0 0;

  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  gap: 8px;
`;

const CorpLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const CorpName = styled.div`
  font-size: 18px;
  font-weight: 530;
`;

const StockCode = styled.div`
  font-size: 14px;
  color: #999999;
`;

const StockPrice = styled.div`
  font-size: 18px;
  color: #ed2926;
  font-weight: 530;
`;

const PriceChangeRate = styled.div`
  font-size: 14px;
  color: #ed2926;
`;

const PriceChangeAmount = styled.div`
  font-size: 14px;
  color: #ed2926;
`;

const TransactionVolume = styled.div`
  font-size: 14px;
  color: #525252;

  & span {
    color: #999999;
    padding-right: 5px;
  }
`;

const TransactionValue = styled.div`
  font-size: 14px;
  color: #525252;

  & span {
    color: #999999;
    padding-right: 5px;
  }
`;
