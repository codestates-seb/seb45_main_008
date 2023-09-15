import axios from "axios";
import { useState, useEffect } from "react"; // useEffect 추가
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { changeCompanyId } from "../../reducer/CompanyId-Reducer";

const MarketServerUrl =
  "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies";

const MarketStockList = () => {
  const [marketStockList, setMarketStockList] = useState<any[]>([]);

  useEffect(() => {
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

  const SortName = () => {
    const sortedList = [...marketStockList];
    sortedList.sort((a, b) => a.korName.localeCompare(b.korName));
    setMarketStockList(sortedList);
  };
  const SortPrice = () => {
    const sortedListPrice = [...marketStockList];
    sortedListPrice.sort((b, a) => {
      const priceA = parseFloat(a.stockAsBiResponseDto.askp1);
      const priceB = parseFloat(b.stockAsBiResponseDto.askp1);
      return priceA - priceB;
    });
    setMarketStockList(sortedListPrice);
  };
  const SortRate = () => {
    const sortedListRate = [...marketStockList];
    sortedListRate.sort((b, a) => {
      const priceA = parseFloat(a.stockInfResponseDto.prdy_ctrt);
      const priceB = parseFloat(b.stockInfResponseDto.prdy_ctrt);
      return priceA - priceB;
    });
    setMarketStockList(sortedListRate);
  };
  const SortVol = () => {
    const sortedListVol = [...marketStockList];
    sortedListVol.sort((b, a) => {
      const priceA = parseFloat(a.stockInfResponseDto.acml_vol);
      const priceB = parseFloat(b.stockInfResponseDto.acml_vol);
      return priceA - priceB;
    });
    setMarketStockList(sortedListVol);
  };
  const dispatch = useDispatch();

  return (
    <StockListContainer>
      <StockListTitle>
        <StockListDetail onClick={SortName}>
          {MarketStockLists.stockName}
        </StockListDetail>
        <StockListDetail onClick={SortPrice}>
          {MarketStockLists.stockPrice}
        </StockListDetail>
        <StockListDetail onClick={SortRate}>
          {MarketStockLists.stockRate}
        </StockListDetail>
        <StockListDetail onClick={SortVol}>
          {MarketStockLists.stockTrade}
        </StockListDetail>
      </StockListTitle>

      {marketStockList.map((el) => (
        <StockListInfo onClick={() => dispatch(changeCompanyId(el.companyId))}>
          <StockInfoName>
            <StockName key={el.korName}>{el.korName}</StockName>
            <StockCode key={el.code}>{el.code}</StockCode>
          </StockInfoName>
          <StockInfoDetail>
            <CurrentPrice>{el.stockAsBiResponseDto.askp1}</CurrentPrice>
            <StockRates
              className={
                el.stockInfResponseDto.prdy_ctrt.startsWith("-")
                  ? "minus"
                  : "plus"
              }
            >
              {el.stockInfResponseDto.prdy_ctrt}
            </StockRates>
            <StockTrade>{el.stockInfResponseDto.acml_vol}</StockTrade>
          </StockInfoDetail>
          <AfterLine></AfterLine>
        </StockListInfo>
      ))}
    </StockListContainer>
  );
};

export default MarketStockList;

const MarketStockLists = {
  stockName: "종목별",
  stockPrice: "현재가Top",
  stockRate: "변동률Top",
  stockTrade: "거래량Top",
};

const StockListContainer = styled.div`
  max-height: 500px;
`;
const StockInfoName = styled.div`
  dispaly: flex;
  align-items: column;
  text-align: center;
  width: 25%;
  color: #000;
  font-size: 15px;
`;
const StockInfoDetail = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: center;
  width: 80%;
`;
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
const StockTrade = styled.div`
  width: 33.3%;
  text-align: center;
  font-size: 15px;
`;
const AfterLine = styled.div`
  border-bottom: 1px solid#f1f1f1;
`;
const CurrentPrice = styled.div`
  width: 33.3%;
  font-size: 15px;
`;
const StockListInfo = styled.div`
  display: flex;
  padding: 10px 0px;
  border-bottom: 1px solid#cfcfcf;

  justify-content: space-around;
  &:hover {
    background-color: #f3f3f3;
  }
`;
const StockName = styled.div`
  font-size: 13px;
`;
const StockRates = styled.div`
  width: 33.3%;

  font-size: 15px;
  &.plus {
    color: #dc143c;
  }
  &.minus {
    color: #0000cd;
  }
`;
const StockCode = styled.div``;
