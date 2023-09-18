import styled from "styled-components";
import naver_logo from "../../asset/logos/naver_logo.png";
import daum_logo from "../../asset/logos/daum_logo.png";
import chosun_logo from "../../asset/logos/Chosun_IIbo_Logo.png";
import donga_logo from "../../asset/logos/donga_logo.png";
import jtbc_logo from "../../asset/logos/jtbc_logo.png";

import MarketkospiChart from "./MarketKospiChart";

const MarketSummary: React.FC = () => {
  return (
    <Market>
      <MarketH3>{SummaryText.now}</MarketH3>
      <Kospiul>
        <MarketkospiChart />
      </Kospiul>
      <News>
        <MarketH3>{SummaryText.liveNews}</MarketH3>
        <NewsCompany>
        <A className="naver" href={NewsListLink.NaverNews} target="_blank">
          <img src={naver_logo} alt="Naver Logo" /> {SummaryText.naverNews}
        </A>
        <A className="daum" href={NewsListLink.DaumNews} target="_blank">
          <img src={daum_logo} alt="Daum Logo" /> {SummaryText.daumNews}
        </A>
        <A className="chosun" href={NewsListLink.chosunNews} target="_blank">
          <img src={chosun_logo} alt="Chosun Ilbo Logo" /> {SummaryText.chosunNews}
        </A>
        <A className="donga" href={NewsListLink.dongaNews} target="_blank">
          <img src={donga_logo} alt="Donga Ilbo Logo" /> {SummaryText.dongaNews}
        </A>
        <A className="jtbc" href={NewsListLink.jtbcNews} target="_blank">
          <img src={jtbc_logo} alt="JTBC Logo" /> {SummaryText.jtbcNews}
        </A>
      </NewsCompany>
      </News>
    </Market>
  );
};
export default MarketSummary;



interface StockStatus {
  now: string;
  kospi: string;
  news: string;
  liveNews: string;
  naverNews: string;
  daumNews: string;
  chosunNews: string;
  dongaNews: string;
  jtbcNews: string;
}

const Market = styled.div`
  margin:0px;
  padding:0px;
`;

const SummaryText: StockStatus = {
  now: "증시현황",
  kospi: "Kospi",
  news: "주요 뉴스",
  liveNews: "뉴스 바로가기",
  naverNews: "네이버 뉴스",
  daumNews: "다음 뉴스",
  chosunNews: "조선일보",
  dongaNews: "동아일보",
  jtbcNews: "JTBC",
};

const NewsListLink = {
  NaverNews: "https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=101",
  DaumNews: "https://news.daum.net/economic#1",
  chosunNews: "https://www.chosun.com/economy/",
  dongaNews: "https://www.donga.com/news/Economy",
  jtbcNews: "https://news.jtbc.co.kr/section/index.aspx?scode=20",
};


const MarketH3 = styled.div`
  text-align: center;
  margin-top: 10px;
  font-weight: 500;
  font-size: 25px;
  color: #2d4f51;
`;

const Kospiul = styled.ul`
  display: flex;
  justify-content: center;
  align-items : center;
  margin-top: 10px;
  margin-left:-30px;
  &.active {
    background-color: white; /* 원하는 활성화 스타일 지정 */
  }
`;

const News = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 10px;
  flex-wrap: nowrap;
  /* align-content: center; */
`;

const NewsCompany = styled.div`
  display: flex;
  margin-top: 0px;
  width: 100%;
  flex-direction: column;  // 세로 방향으로 아이템들을 배열
  align-items: center;     // 아이템들을 세로 방향으로 중앙에 정렬


`;

const A = styled.a`
  display: flex; // flex 사용
  align-items: center; // 세로 중앙 정렬
  justify-content: space-around; // 가로 중앙 정렬
  width: 300px;
  border-radius: 5px;
  margin-bottom: 10px;
  color: black;
  padding: 10px 10px;
  border: 1px solid#333;
  margin-top: 20px;
  
  & img { // 로고 이미지 스타일링
    width: 90px;
    height: 30px;
    margin-right: 8px;  // 로고와 텍스트 사이의 여백을 조정
  }
  &.naver {
    background-color: white;
    border: 1px solid lightslategray;
    &:hover {
      background-color: #f2f2f2;

    }
  }
  &.daum {
    background-color: white;
    border: 1px solid lightslategray;
    &:hover {
      background-color: #f2f2f2;

    }
  }
  &.chosun {
    background-color: white;
    border: 1px solid lightslategray;
    &:hover {

      background-color: #f2f2f2;
    }
  }
  &.donga {
    background-color: white;
    border: 1px solid lightslategray;
    &:hover {
      background-color: #f2f2f2;

    }
  }
  &.jtbc {    
    background-color: white;
    border: 1px solid lightslategray;
    &:hover {
      background-color: #f2f2f2;
    }
  }
`;


