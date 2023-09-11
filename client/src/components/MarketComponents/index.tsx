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

const SummaryText: StockStatus = {
  now: "증시현황",
  kospi: "Kospi",
  news: "주요 뉴스",
  liveNews: "실시간 뉴스 바로가기",
  naverNews: "네이버뉴스",
  daumNews: "다음뉴스",
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

const Market = styled.div`
  text-align: center;
`;
const News = styled.div`
  display: flex;
  flex-direction: column;

  height: 500px;
  width: 100%;
  margin-top: 120px;
  flex-wrap: wrap;
  align-content: space-around;
`;
const A = styled.a`
  border-radius: 10px 10px;
  &.naver {
    color: white;
    background-color: #088a08;
    border: none;

    &:hover {
      background-color: #0b610b;
      color: white;
    }
  }
  &.daum {
    background-color: white;
    border: 1px solid blue;
    &:hover {
      background-color: blue;
      color: white;
    }
  }
  &.chosun {
    background-color: white;
    border: 1px solid red;
    color: red;
    &:hover {
      color: white;
      background-color: red;
    }
  }
  &.donga {
    &:hover {
      background-color: #282b2c;
      color: white;
    }
  }
  &.jtbc {
    border: 1px solid skyblue;
    &:hover {
      background-color: skyblue;
      color: white;
    }
  }

  margin-bottom: 20px;
  color: black;
  padding: 10px 10px;
  width: 80%;
  border: 1px solid#333;
  margin-top: 20px;
`;
const MarketH3 = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  color: #2d4f51;
`;
const Kospiul = styled.ul`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  &.active {
    background-color: lightblue; /* 원하는 활성화 스타일 지정 */
  }
`;
