import axios from "axios";
import { useState, useEffect } from "react";
import styled from "styled-components";
const StockDisscussionUrl =
  "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/companies";

const StockDisscussion: React.FC = () => {
  const [StockDisscussions, setStockDisscussions] = useState<StockDiscussion[]>(
    []
  ); // 타입을 명시하고 초기 상태를 빈 배열로 설정

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져오도록 useEffect를 사용
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
    <div>
      {StockDisscussions.map((el) => (
        <DisscussionList>{el.korName}</DisscussionList>
      ))}
    </div>
  );
};
export default StockDisscussion;
interface StockDiscussion {
  id: number;
  korName: string;
  // 다른 필드들도 여기에 추가할 수 있습니다.
}
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
