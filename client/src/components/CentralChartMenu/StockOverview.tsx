import { useSelector } from "react-redux";
import { styled } from "styled-components";
import useGetStockInfo from "../../hooks/useGetStockInfo";
import { StateProps } from "../../models/stateProps";

// dummyData
import dummyLogo from "../../asset/CentralSectionMenu-dummyImg.png";
import kia from '../../asset/logos/기아.svg';
import dy from '../../asset/logos/디와이.jpeg';
import logosamsung from '../../asset/logos/삼성전자.svg';
import celltrion from '../../asset/logos/셀트리온.svg';
import ecopro from '../../asset/logos/에코프로.jpeg';
import ecoproBM from '../../asset/logos/에코프로비엠.svg';
import kakaoBank from '../../asset/logos/카카오뱅크.svg';
import kuckoo from '../../asset/logos/쿠쿠홀딩스.jpeg';
import hanse from '../../asset/logos/한세엠케이.jpeg';
import hyundai from '../../asset/logos/현대차.svg';
import KG from '../../asset/logos/KG케미칼.png';
import LGelec from '../../asset/logos/LG전자.svg';
import LGchem from '../../asset/logos/LG화학.svg';
import posco from '../../asset/logos/POSCO홀딩스.svg';

const marketType: string = "코스피";
const volumeText: string = "거래량";
const valueText: string = "거래대금";

// styled-component 수정 및 미디어 쿼리 적용
const StockOverview = () => {
  const companyId = useSelector((state: StateProps) => state.companyId);
  const { stockInfo, stockInfoLoading, stockInfoError } = useGetStockInfo(companyId);

  const corpName = stockInfo?.korName;

  // 이미 import된 로고들을 바탕으로 logos 객체 생성
  const logos: LogoPaths = {
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
      const companyLogo = corpName ? logos[corpName] || dummyLogo : dummyLogo; 
      if (!corpName) {
        return null; // 혹은 다른 적절한 렌더링을 반환
    }

  if (stockInfoLoading) {
    return <p>로딩 중 입니다</p>;
  }

  if (stockInfoError) {
    return <p>에러 발생</p>;
  }


  const stockCode = stockInfo.code;
  const stockPrice = parseInt(stockInfo.stockInfResponseDto.stck_prpr, 10).toLocaleString();
  const priceChageRate = parseFloat(stockInfo.stockInfResponseDto.prdy_ctrt);
  const chageDirection = priceChageRate > 0 ? "▲" : "▼";
  const priceChageAmount = Math.abs(parseInt(stockInfo.stockInfResponseDto.prdy_vrss, 10)).toLocaleString();
  const transactionVolume = parseInt(stockInfo.stockInfResponseDto.acml_vol, 10).toLocaleString();

  // 총 거래대금 계산
  const amount = parseInt(stockInfo.stockInfResponseDto.acml_tr_pbmn, 10);
  const [billions, tenThousands] = [Math.floor(amount / 100000000), Math.floor((amount % 100000000) / 10000)];
  const transactionValue = `${billions.toLocaleString()}억 ${tenThousands.toLocaleString()}만`;

  return (
    <Container priceChangeRate={priceChageRate}>
      <img className="CorpLogo" src={companyLogo} alt="stock logo"/>
      <div className="CorpName">{corpName}</div>
      <div className="StockCode">
        {stockCode} <span>{marketType}</span>
      </div>
      <div className="StockPrice">{stockPrice}</div>
      <div className="PriceChangeRate">{priceChageRate}%</div>
      <div className="PriceChangeAmount">
        <div className="changeDirection">{chageDirection}</div> {priceChageAmount}
      </div>
      <TransactionVolume>
        <span>{volumeText}</span>
        {transactionVolume}
      </TransactionVolume>
      <TransactionValue>
        <span>{valueText}</span>
        {transactionValue}
      </TransactionValue>
    </Container>
  );
};

export default StockOverview;

//객체 변수타입 설정
type LogoPaths = {
  [key: string]: string;
};

// component 생성
const Container = styled.div<{ priceChangeRate: number }>`
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
    color: ${(props) => (props.priceChangeRate > 0 ? "#ed2926" : props.priceChangeRate === 0 ? "black" : "#3177d7")};
    font-weight: 530;
  }

  .PriceChangeRate,
  .PriceChangeAmount {
    font-size: 14px;
    color: ${(props) => (props.priceChangeRate > 0 ? "#ed2926" : props.priceChangeRate === 0 ? "black" : "#3177d7")};

    display: flex;
    flex-direction: row;
    gap: 2px;

    .changeDirection {
      font-size: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const TransactionVolume = styled.div`
  white-space: nowrap;
  min-width: min-content;
  font-size: 14px;
  color: #2f4f4f;

  & span {
    color: #999999;
    padding-right: 5px;
  }
`;

const TransactionValue = styled(TransactionVolume)``;
