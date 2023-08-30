import styled from "styled-components";

//시장정보 탭의 프레임 스타일
export const MarketInfoStyle = styled.div`
  display: flex;
  justify-content: space-around;
`;

//시장정보 탭의 시장요약 스타일
export const Market = styled.div`
  text-align: center;
`;
export const News = styled.div`
  text-align: left;
  height: 200px;
  width: 100%;
  background-color: red;
  margin-top: 120px;
`;
export const MarketH3 = styled.h3`
  text-align: left;
  margin-top: 20px;
  font-weight: bold;
  color: red;
`;
export const Kospi = styled.ul`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  &.active {
    background-color: lightblue; /* 원하는 활성화 스타일 지정 */
  }
`;
//시장정보 탭의 전체주식 스타일
export const StockList = styled.div``;
//시장정보 탭의 시장이슈 스타일
export const Issue = styled.div``;
