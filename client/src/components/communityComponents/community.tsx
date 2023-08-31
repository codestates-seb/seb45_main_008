//import { TabNavArea } from "./TabNavArea";
import { useState } from "react";
import styled from "styled-components";
export const Community = () => {
  // const [submitButton, setSubmitButton] = useState("");
  const [inputValue, setinputValue] = useState("");
  const [selectCommunity, setSelectCommunity] = useState("timeline");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
    console.log(inputValue);
  };

  const [openDropDown, setOpenDropDown] = useState(false);
  const handleSetOpenDropDown = () => {
    setOpenDropDown(!openDropDown);
  };
  // 커뮤니티 페이지 텍스트문구 객체 정리
  interface communityText {
    timeline: string;
    stockDisscussion: string;
  }
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

      {selectCommunity === "timeline" && (
        <TimeLineSection>
          {openDropDown === false && (
            <Button onClick={handleSetOpenDropDown}></Button>
          )}
          {openDropDown === true && (
            <>
              <DropDownClose onClick={handleSetOpenDropDown}>
                닫기
              </DropDownClose>
              <DropdownInput
                type="text"
                placeholder="이곳에 작성해 주세요"
                value={inputValue}
                onChange={handleOnChange}
              ></DropdownInput>
              <SubmitButton>Submit</SubmitButton>
            </>
          )}
          <BoardArea>gdgdgdgd</BoardArea>
        </TimeLineSection>
      )}
      {selectCommunity === "stockDisscussion" && (
        <TimeLineSection>
          <Button></Button>
        </TimeLineSection>
      )}
    </div>
  );
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

//타임라인 탭버튼 클릭시 보여지는 영역

const TimeLineSection = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  flex-wrap: wrap;
`;

//글작성을위해 클릭시 드롭다운 열어주는 버튼
const Button = styled.button`
  border-style: none;
  background-color: #ececec;
  width: 300px;
  height: 30px;
  border-radius: 30px 30px;
  &:hover {
    background-color: #c3c3c3;
    cursor: pointer;
  }
  &:after {
    content: "무슨 생각을하고 계신가요?";
    border-radius: 30px 30px;
    display: block;
    width: 100%;
    height: 20px;
  }
`;
//드롭다운 스타일 및 닫기버튼 스타일
const DropdownInput = styled.input`
  width: 300px;
  height: 80px;
`;
const DropDownClose = styled.div`
  text-align: right;
  cursor: pointer;
`;
//글 업로드 버튼 및 게시글 영역

const SubmitButton = styled.button`
  width: 300px;
  height: 20px;
  color: black;
  cursor: pointer;
  border-radius: 4px;
`;
const BoardArea = styled.div`
  text-align: center;
  width: 300px;
  height: 300px;
  border: 1px solid#c3c3c3;
`;
