import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

const MarketSummary: React.FC = () => {
  //컴포넌트 안쪽의 텍스트 변수
  //컴포넌트 내부 텍스트 변수로 치환후 사용
  const KospiDataServerUrl =
    "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/kospi";
  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져오도록 useEffect를 사용
    KospiDataFromServer();
  }, []);

  const KospiDataFromServer = async () => {
    try {
      const response = await axios.get(KospiDataServerUrl);
      const KospiData = response.data;
      setKospiDatas(KospiData);
      console.log(kospiDatas, "kospi");
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };
  const [kospiDatas, setKospiDatas] = useState<string | object>({});

  interface StockStatus {
    now: string;
    kospi: string;
    kosdaq: string;
    kospi200: string;
    news: string;
  }

  const SummaryText: StockStatus = {
    now: "증시현황",
    kospi: "Kospi",
    kosdaq: "kosdaq",
    kospi200: "kospi200",
    news: "주요 뉴스",
  };

  return (
    <Market>
      <MarketH3>{SummaryText.now}</MarketH3>
      <Kospiul>
        <div>{SummaryText.kospi}</div>
      </Kospiul>

      <News>
        <h3>실시간 뉴스</h3>
        <A href={NewsListLink.NaverNews}>네이버뉴스</A>
        <A href={NewsListLink.DaumNews}>다음뉴스</A>
        <A href={NewsListLink.chosunNews}>조선일보</A>
        <A href={NewsListLink.dongaNews}>동아일보</A>
        <A href={NewsListLink.jtbcNews}>JTBC</A>
      </News>
    </Market>
  );
};
export default MarketSummary;

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
  height: 300px;
  width: 100%;
  margin-top: 120px;
  flex-wrap: wrap;
  align-content: space-around;
`;
const A = styled.a`
  color: black;
  padding: 10px 10px;
  width: 80%;
  border: 1px solid#333;
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
