import axios from "axios";
import { useState, useEffect } from "react"; // useEffect 추가
import styled from "styled-components";
const MarketServerUrl =
  "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies";

const MarketStockList: React.FC = () => {
  const [marketStockList, setMarketStockList] = useState<any[]>([]); // 타입을 명시하고 초기 상태를 빈 배열로 설정
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져오도록 useEffect를 사용
    MarketDataFromServer();
  }, []);

  const MarketDataFromServer = async () => {
    try {
      const response = await axios.get(MarketServerUrl);
      const marketListData = response.data;
      setMarketStockList(marketListData);
      setIsLoading(false);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
      setIsLoading(false);
    }
  };
  const SortName = () => {
    // 정렬 함수를 수정하여 즉시 정렬 적용
    const sortedList = [...marketStockList];
    sortedList.sort((a, b) => a.korName.localeCompare(b.korName));
    setMarketStockList(sortedList);
  };

  return (
    <div>
      <StockListTitle>
        <StockListDetail>#종목명</StockListDetail>
        <StockListDetail>#현재가</StockListDetail>
        <StockListDetail>#변동률</StockListDetail>
        <StockListDetail>#거래량</StockListDetail>
      </StockListTitle>

      {marketStockList.map((el) => (
        <div>
          {isLoading === true ? (
            <div>isLoading...</div>
          ) : (
            <StockName onClick={SortName} key={el.korName}>
              {el.korName}
            </StockName>
          )}
          <StockCode key={el.code}>{el.code}</StockCode>
          <br />
          <StockInfo>{el.stockInfResponseDto}</StockInfo>
        </div>
      ))}
    </div>
  );
};

export default MarketStockList;

const StockListTitle = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const StockListDetail = styled.div`
  padding: 5px 5px;
  font-size: 12px;
  border: 1px solid#333;
  border-radius: 20px 20px;
  cursor: pointer;
  transition: all.3s;
  &:hover {
    padding: 5px 20px;
  }
`;
const StockName = styled.div``;
const StockCode = styled.div``;
const StockInfo = styled.div``;
