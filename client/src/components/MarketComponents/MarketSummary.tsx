import styled from "styled-components";
import { useState } from "react";
// import { parseString } from "xml2js";
// import axios from "axios";
const MarketSummary: React.FC = () => {
  const [selectKospi, setSelectKospi] = useState<string>("kospi");
  const handleKospiClick = (tab: string) => {
    setSelectKospi(tab);

    console.log(tab);
  };
  //컴포넌트 안쪽의 텍스트 변수
  //컴포넌트 내부 텍스트 변수로 치환후 사용

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
  // const [rssItems, setRssItems] = useState([]);

  // useEffect(() => {
  //   const fetchRSSFeed = async () => {
  //     try {
  //       const response = await axios.get(
  //         "https://www.chosun.com/arc/outboundfeeds/rss/category/economy/?outputType=xml"
  //       );

  //       // RSS 피드 XML을 JavaScript 객체로 파싱
  //       parseString(response.data, (err, result) => {
  //         if (err) {
  //           console.error("Error parsing XML:", err);
  //           return;
  //         }

  //         // 파싱된 데이터 중에서 아이템 정보 가져오기
  //         const items = result.rss.channel[0].item;

  //         // 화면에 출력할 데이터를 상태에 저장
  //         setRssItems(items);
  //       });
  //     } catch (error) {
  //       console.error("Error:", error);
  //     }
  //   };

  //   fetchRSSFeed();
  // }, []);
  return (
    <Market>
      <MarketH3>{SummaryText.now}</MarketH3>
      <Kospi>
        <li
          onClick={() => handleKospiClick("kospi")}
          className={selectKospi === "kospi" ? "active" : ""}
        >
          {SummaryText.kospi}
        </li>
        <li
          onClick={() => handleKospiClick("kosdaq")}
          className={selectKospi === "kospi" ? "active" : ""}
        >
          {SummaryText.kosdaq}
        </li>
        <li
          onClick={() => handleKospiClick("kospi200")}
          className={selectKospi === "kospi" ? "active" : ""}
        >
          {SummaryText.kospi200}
        </li>
      </Kospi>
      {selectKospi === "kospi" && (
        <div>Kospi {/*9UI1TAFMQFM21QAS 알파어드밴티지 api키*/}</div>
      )}
      {selectKospi === "kosdaq" && <div>Kosdq</div>}
      {selectKospi === "kospi200" && <div>Kospi200</div>}
      <News>
        <A href="https://news.naver.com/main/main.naver?mode=LSD&mid=shm&sid1=101">
          {SummaryText.news} &gt;
        </A>
        <div>newsList</div>
      </News>
    </Market>
  );
};
export default MarketSummary;
const Market = styled.div`
  text-align: center;
`;
const News = styled.div`
  text-align: left;
  height: 200px;
  width: 100%;
  background-color: #f3f3f3;
  margin-top: 120px;
`;
const A = styled.a`
  color: black;
`;
const MarketH3 = styled.h3`
  text-align: left;
  margin-top: 20px;
  font-weight: bold;
  color: red;
`;
const Kospi = styled.ul`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  &.active {
    background-color: lightblue; /* 원하는 활성화 스타일 지정 */
  }
`;
