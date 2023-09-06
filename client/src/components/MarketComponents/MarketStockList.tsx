import axios from "axios";
import { useState, useEffect } from "react"; // useEffect 추가

const MarketServerUrl =
  "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies";

const MarketStockList: React.FC = () => {
  const [marketStockList, setMarketStockList] = useState<any[]>([]); // 타입을 명시하고 초기 상태를 빈 배열로 설정

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져오도록 useEffect를 사용
    MarketDataFromServer();
  }, []);

  const MarketDataFromServer = async () => {
    try {
      const response = await axios.get(MarketServerUrl);
      const marketListData = response.data;
      setMarketStockList(marketListData);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <div>종목명</div>
      <div>현재가</div>
      <div>변동률</div>
      <div>거래량</div>
      {marketStockList.length > 0 ? ( // 데이터가 있는 경우에만 렌더링
        marketStockList.map((el) => (
          <div>
            <div key={el.korName}>{el.korName}</div>
            <div key={el.code}>{el.code}</div>
            <div>{el.stockInfResponseDto}</div>
          </div>
        ))
      ) : (
        <div>Loading...</div> // 데이터가 로딩 중인 경우 표시
      )}
    </div>
  );
};

export default MarketStockList;
