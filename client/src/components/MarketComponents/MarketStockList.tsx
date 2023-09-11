import axios from "axios";
import { useState, useEffect } from "react"; // useEffect 추가
import styled from "styled-components";
const MarketServerUrl =
  "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies";

const MarketStockList: React.FC = () => {
  const [marketStockList, setMarketStockList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
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
    const sortedList = [...marketStockList];
    sortedList.sort((a, b) => a.korName.localeCompare(b.korName));
    setMarketStockList(sortedList);
  };

  return (
    <div>
      <StockListTitle>
        <StockListDetail onClick={SortName}>
          {MarketStockLists.stockName}
        </StockListDetail>
        <StockListDetail>{MarketStockLists.stockPrice}</StockListDetail>
        <StockListDetail>{MarketStockLists.stockRate}</StockListDetail>
        <StockListDetail>{MarketStockLists.stockTrade}</StockListDetail>
      </StockListTitle>

      {marketStockList.map((el) => (
        <StockListInfo>
          <div>
            {isLoading === true ? (
              <div>{MarketStockLists.isLoading}</div>
            ) : (
              <StockName key={el.korName}>{el.korName}</StockName>
            )}
            <StockCode key={el.code}>{el.code}</StockCode>
            <br />
            <StockInfo>{el.stockInfResponseDto}</StockInfo>
          </div>
          <AfterLine></AfterLine>
        </StockListInfo>
      ))}
    </div>
  );
};

export default MarketStockList;

const MarketStockLists = {
  stockName: "#종목명",
  stockPrice: "#현재가",
  stockRate: "#변동률",
  stockTrade: "#거래량",
  isLoading: "isLoading...",
};
const StockListTitle = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 30px;
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

const AfterLine = styled.div`
  border-bottom: 1px solid#f1f1f1;
`;

const StockListInfo = styled.div`
  &:hover {
    background-color: #f3f3f3;
  }
`;
const StockName = styled.div``;
const StockCode = styled.div``;
const StockInfo = styled.div``;
