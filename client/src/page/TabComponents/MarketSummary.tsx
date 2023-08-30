import { Market, Kospi, MarketH3, News } from "../TabStyle/MarketInfoStyle";
import { useState } from "react";
const MarketSummary: React.FC = () => {
  const [selectKospi, setSelectKospi] = useState<string>("kospi");
  const handleKospiClick = (tab: string) => {
    setSelectKospi(tab);

    console.log(tab);
  };
  //컴포넌틔 안쪽의 텍스트 변수
  const now: string = "증시현황";
  return (
    <Market>
      <MarketH3>{now}</MarketH3>
      <Kospi>
        <li
          onClick={() => handleKospiClick("kospi")}
          className={selectKospi === "kospi" ? "active" : ""}
        >
          코스피
        </li>
        <li
          onClick={() => handleKospiClick("kosdaq")}
          className={selectKospi === "kospi" ? "active" : ""}
        >
          코스닥
        </li>
        <li
          onClick={() => handleKospiClick("kospi200")}
          className={selectKospi === "kospi" ? "active" : ""}
        >
          코스피200
        </li>
      </Kospi>
      {selectKospi === "kospi" && <div>Kospi</div>}
      {selectKospi === "kosdaq" && <div>Kosdq</div>}
      {selectKospi === "kospi200" && <div>Kospi200</div>}
      <News>
        <h3>주요뉴스 &gt;</h3>
      </News>
    </Market>
  );
};
export default MarketSummary;
