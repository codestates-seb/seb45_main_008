import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
const StockDisscussionUrl =
  "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies";

const StockDisscussion: React.FC = () => {
  const [StockDisscussions, setStockDisscussions] = useState<StockDiscussion[]>(
    []
  );

  useEffect(() => {
    MarketDataFromServer();
  }, []);

  const MarketDataFromServer = async () => {
    try {
      const response = await axios.get(StockDisscussionUrl);
      const marketListData = response.data;
      setStockDisscussions(marketListData);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };
  return (
    <DisscussionContainer>
      {StockDisscussions.map((el) => (
        <DisscussionList>{el.korName}</DisscussionList>
      ))}
    </DisscussionContainer>
  );
};
export default StockDisscussion;
interface StockDiscussion {
  id: number;
  korName: string;
}
const DisscussionContainer = styled.div`
  max-height: 600px;
`;
const DisscussionList = styled.div`
  display: flex;

  justify-content: space-around;
  margin: 0 auto;
  margin-top: 20px;
  padding: 15px 10px;
  border-radius: 4px 4px;
  width: 80%;
  margin-bottom: 20px;
  border: 1px solid#333;
  cursor: pointer;
  &:hover {
    background-color: #333;
    color: white;
  }
`;
