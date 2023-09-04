import { useState, useEffect } from "react";
import styled from "styled-components";
import Comments from "./Comments";
import { DotIcon } from "./IconComponent/Icon";

const TimeLineComponent = () => {
  //로컬스토리지 생성
  const [data, setData] = useState<string>("");
  useEffect(() => {
    localStorage.setItem("boradData", data);
    setData("");
  }, []);

  const [boardData, setBoardData] = useState<BoardData[]>(() => {
    const storedData = localStorage.getItem("boardData");
    return storedData ? JSON.parse(storedData) : [];
  });

  //드롭다운 버튼 텍스트 작성창 열기
  const [openDropDown, setOpenDropDown] = useState(false);
  const handleSetOpenDropDown = () => {
    setOpenDropDown(!openDropDown);
  };

  //밸류값 저장
  const [inputValue, setinputValue] = useState("");

  //작성된 텍스트를 밸류에 저장
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
    console.log(inputValue);
  };

  // 서브밋 버튼 클릭시 로컬스토리지에 작성된 텍스트 저장
  const handleClickSubmit = () => {
    if (inputValue.length !== 0) {
      //if 문의 조건식에 inputValue만 사용해도 정상 작동하는
      //이유는 JavaScript와 TypeScript의 "Truthy"와 "Falsy" 값 변환 규칙때문
      const newBoardData: BoardData = {
        id: new Date().getTime(),
        boardText: inputValue,
        comments: "",
        nickname: `user${UserId}`,
      };

      setBoardData((prevBoardData) => [...prevBoardData, newBoardData]);
    } else {
      return alert("내용이 없습니다");
    }
    alert("작성완료");
    window.location.href = "http://localhost:5173/community";
  };

  //닷버튼 클릭 및 삭제하기 기능
  // const [dotMenuOpen, setDotMenuOpen] = useState(false);
  const [dotMenuOpenMap, setDotMenuOpenMap] = useState<{
    [key: number]: boolean;
  }>({});
  const handleDotOpen = (id: number) => {
    setDotMenuOpenMap((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // 해당 게시물의 상태를 토글
    }));
    // setDotMenuOpen(!dotMenuOpen);
  };

  const handleDeleteClick = (id: number) => {
    // ID를 사용하여 해당 게시물을 식별하고 삭제
    const deleteData = boardData.filter((el) => el.id !== id);
    localStorage.setItem("boardData", JSON.stringify(deleteData));
    window.location.href = "http://localhost:5173/community";
  };
  //유저 아이디 랜덤 설정
  const getRandomFourDigitNumber = () => {
    const min = 1000; // 1000 이상의 수
    const max = 9999; // 9999 이하의 수
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const UserId = getRandomFourDigitNumber();

  //boardData업데이트될때 마다 로컬스토리지 데이터 저장
  useEffect(() => {
    localStorage.setItem("boardData", JSON.stringify(boardData));
  }, [boardData]);

  return (
    <TimeLine>
      {openDropDown === false && (
        <Button onClick={handleSetOpenDropDown}></Button>
      )}

      {openDropDown === true && (
        <>
          <DropDownClose onClick={handleSetOpenDropDown}>
            <p>닫기</p>
          </DropDownClose>
          <DropdownInput
            type="text"
            placeholder="이곳에 작성해 주세요"
            value={inputValue}
            onChange={handleOnChange}
          ></DropdownInput>

          <SubmitButton onClick={handleClickSubmit}>Submit</SubmitButton>
        </>
      )}
      <DevideLine></DevideLine>
      <BoardArea>
        {boardData.length === 0 ? (
          <BoardTextAreaNoText>
            아직 글이 작성되지 않았습니다
          </BoardTextAreaNoText>
        ) : (
          boardData
            .slice()
            .reverse()
            .map((el) => (
              <BoardTextArea>
                <Delete>
                  <div onClick={() => handleDotOpen(el.id)}>
                    <DotIcon />
                  </div>
                  {dotMenuOpenMap[el.id] && (
                    <DeleteBoard onClick={() => handleDeleteClick(el.id)}>
                      삭제하기
                    </DeleteBoard>
                  )}
                </Delete>
                <BoardText>
                  {el.nickname}
                  <br />
                  {el.boardText}
                </BoardText>
                <Comments postId={el.id}></Comments>
              </BoardTextArea>
            ))
        )}
      </BoardArea>
    </TimeLine>
  );
};
export default TimeLineComponent;

interface BoardData {
  id: number;
  boardText: string;
  comments: string;
  nickname: string;
}

//드롭다운 글작성 스타일 및 닫기버튼 스타일
const DropdownInput = styled.input`
  text-align: center;
  border: 1px solid#40797c;
  width: 90%;
  height: 80px;
  outline: none;
  &:focus {
    border: 2px solid#40797c;
  }
`;

const DropDownClose = styled.div`
  text-align: right;
  cursor: pointer;
  color: #40797c;
  &:hover {
    color: #2d4f51;
  }
`;

//글작성을위해 클릭시 드롭다운 열어주는 버튼

const Button = styled.button`
  border-style: none;
  background-color: #2d4f51;
  width: 380px;
  height: 30px;
  border-radius: 30px 30px;
  margin: 0 auto;
  margin-bottom: 15px;

  &:hover {
    background-color: #40797c;
    cursor: pointer;
  }
  &:after {
    content: "무슨 생각을하고 계신가요?";
    display: block;

    color: #fff;
    width: 100%;
  }
`;

//버튼 과 글영역 구분
const DevideLine = styled.div`
  margin-bottom: 10px;
  position: relative;

  &:after {
    position: absolute;
    top: 5px;
    content: "";
    border-bottom: 2px solid#e1e1e1;
    display: block;
    width: 100%;
    height: 5px;
  }
`;
//글 업로드 버튼 및 게시글 영역

const SubmitButton = styled.button`
  display: block;
  width: 60px;
  height: 30px;
  color: #fff;
  border: none;
  background-color: #40797c;
  cursor: pointer;
  border-radius: 10px;
  margin: 5px auto;
  &:hover {
    background-color: #2d4f51;
  }
  &:focus {
    border-style: inset;
    border-color: #40797c;
  }
`;

//게시판 전체 영역
const BoardArea = styled.div`
  text-align: center;
  margin-top: 25px;
  width: 90%;
`;
//게시글 스타일
const BoardTextAreaNoText = styled.div`
  width: 80%;
  padding-bottom: 10px;
  border-radius: 20px 20px;
  border: 1px solid#40797c;
  margin: 0 auto;
  margin-bottom: 10px;
  padding-top: 10px;
  color: #c3c3c3;
`;
const BoardTextArea = styled.div`
  width: 80%;
  padding-bottom: 10px;
  border-radius: 20px 20px;
  border: 1px solid#40797c;
  margin: 0 auto;
  margin-bottom: 10px;
  padding-top: 10px;
  color: #333;
`;
const BoardText = styled.div`
  margin-top: 10px;
  margin-left: 25px;
  max-width: 300px;
  min-height: 100px;
`;
const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  flex-wrap: wrap;
`;
//게시글 삭제
const Delete = styled.div`
  text-align: right;
  position: relative;
`;
const DeleteBoard = styled.span`
  position: absolute;
  background-color: white;
  font-size: 12px;
  padding: 6px;
  color: #40797c;
  right: 20px;
  top: 35px;
  &:hover {
    background-color: #40797c;
    color: white;
  }

  border: 1px solid#40797c;
  cursor: pointer;
`;
