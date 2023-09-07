//import { TabNavArea } from "./TabNavArea";
import { useState } from "react";
import styled from "styled-components";
import TimeLineComponent from "../../components/communityComponents/index";
import StockDisscussion from "../../components/communityComponents/StockDisscussion";

export const Community = () => {
  // const [submitButton, setSubmitButton] = useState("");

  const [selectCommunity, setSelectCommunity] = useState("timeline");

  // 커뮤니티 페이지 텍스트문구 객체 정리

  const communityText = {
    timeline: "타임라인",
    stockDisscussion: "종목토론",
  };

  return (
    <div>
      <CommunityNav>
        {/*커뮤니티 내부 탭 전환*/}
        {selectCommunity === "timeline" ? (
          <NavButtonFocus onClick={() => setSelectCommunity("timeline")}>
            {communityText.timeline}
          </NavButtonFocus>
        ) : (
          <NavButton onClick={() => setSelectCommunity("timeline")}>
            {communityText.timeline}
          </NavButton>
        )}
        {selectCommunity === "stockDisscussion" ? (
          <NavButtonFocus
            onClick={() => setSelectCommunity("stockDisscussion")}
          >
            {communityText.stockDisscussion}
          </NavButtonFocus>
        ) : (
          <NavButton onClick={() => setSelectCommunity("stockDisscussion")}>
            {communityText.stockDisscussion}
          </NavButton>
        )}
      </CommunityNav>

      {selectCommunity === "timeline" && <TimeLineComponent />}
      {selectCommunity === "stockDisscussion" && <StockDisscussion />}
    </div>
  );
  interface communityText {
    timeline: string;
    stockDisscussion: string;
  }
};

// 커뮤니티 타임라인 , 종복정보 탭 전체영역 스타일
const CommunityNav = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

// 타임라인 ,종목토론 탭버튼 스타일
const NavButton = styled.div`
  cursor: pointer;
  color: #8c8c8c;
  font-weight: bold;
  &:hover {
    color: #333;
  }
`;
// 타임라인, 종목토론 탭버튼 클릭 시 스타일
const NavButtonFocus = styled.div`
  color: black;
  cursor: pointer;

  font-weight: bold;
`;

//글작성을위해 클릭시 드롭다운 열어주는 버튼
