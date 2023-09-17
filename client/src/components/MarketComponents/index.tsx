import styled from "styled-components";

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
            {SummaryText.naverNews}
          </A>
          <A className="daum" href={NewsListLink.DaumNews} target="_blank">
            {SummaryText.daumNews}
          </A>
          <A className="chosun" href={NewsListLink.chosunNews} target="_blank">
            {SummaryText.chosunNews}
          </A>
          <A className="donga" href={NewsListLink.dongaNews} target="_blank">
            {SummaryText.dongaNews}
          </A>
          <A className="jtbc" href={NewsListLink.jtbcNews} target="_blank">
            {SummaryText.jtbcNews}
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
  naverNews: "네이버",
  daumNews: "다음",
  chosunNews: "조선일보",
  dongaNews: "동아일보",
  jtbcNews: "jtbc",
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
  margin-top: 20px;
  font-weight: 500;
  font-size: 25px;
  color: #2d4f51;
`;

const Kospiul = styled.ul`
  display: flex;
  justify-content: center;
  align-items : center;
  margin-top: 20px;
  &.active {
    background-color: white; /* 원하는 활성화 스타일 지정 */
  }
`;

const News = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 30px;
  flex-wrap: nowrap;
  /* align-content: center; */
`;

const NewsCompany = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  flex-direction: column;  // 세로 방향으로 아이템들을 배열
  align-items: center;     // 아이템들을 세로 방향으로 중앙에 정렬


`;

const A = styled.a`
  width: 300px;
  border-radius: 5px;
  margin-bottom: 20px;
  color: black;
  padding: 10px 10px;
  border: 1px solid#333;
  margin-top: 20px;

  &.naver {
    color: green;
    background-color: white;
    border: 1px solid lightslategray;
    &:hover {
      background-color: #f2f2f2;
      color: green;
    }
  }
  &.daum {
    background-color: white;
    border: 1px solid lightslategray;

    &:hover {
      background-color: blue;
      color: white;
    }
  }
  &.chosun {
    background-color: white;
    border: 1px solid lightslategray;

    color: red;
    &:hover {
      color: white;
      background-color: red;
    }
  }
  &.donga {
    background-color: white;
    border: 1px solid lightslategray;

    &:hover {
      background-color: #282b2c;
      color: white;
    }
  }
  &.jtbc {    
    background-color: white;
    border: 1px solid lightslategray;

    &:hover {
      background-color: skyblue;
      color: white;
    }
  }


`;


