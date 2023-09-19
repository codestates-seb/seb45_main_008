import { useState, useEffect } from "react";
import styled from "styled-components";
import Comments from "./Comments";
import { DotIcon } from "./IconComponent/Icon";
import axios from "axios";

const serverUrl =
  "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/api/boards";

const TimeLineComponent = () => {
  const [boardData, setBoardData] = useState<BoardData[]>([]);

  useEffect(() => {
    fetchBoardDataFromServer();
  }, []);

  const fetchBoardDataFromServer = async () => {
    try {
      const response = await axios.get(serverUrl);
      const boardDatas = response.data;
      setBoardData(boardDatas);
    } catch (error) {
      console.error("데이터 가져오기 중 오류 발생:", error);
    }
  };
  // 작성 시각을 원하는 형식으로 변환하는 유틸리티 함수
  // const formatDate = (isoString: string): string => {
  //   const date = new Date(isoString);
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();

  //   const formattedHours = hours > 12 ? hours - 12 : hours;
  //   const ampm = hours >= 12 ? "오후" : "오전";
  //   const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  //   return `${year}년 ${month}월 ${day}일 ${ampm} ${formattedHours}:${formattedMinutes}`;
  // };

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
  };

  // 서브밋 버튼 클릭
  const accessToken = localStorage.getItem("accessToken");
  const handleClickSubmit = async () => {
    if (inputValue.length !== 0) {
      const newBoardData = {
        title: "TestBoard",
        content: inputValue,
        comments: "",
      };

      try {
        const response = await axios.post(serverUrl, newBoardData, {
          headers: {
            Authorization: accessToken,
          },
        });
        if (response.status === 201) {
          alert("작성 되었습니다");
          setinputValue(""); // 입력 필드 초기화

          fetchBoardDataFromServer();
        } else {
          alert("작성실패");
        }
      } catch (error) {
        console.log("데이터 추가 중 오류 발생:", error);
        alert("작성실패");
      }
    } else {
      alert("내용이 없습니다");
    }
  };

  //닷버튼 클릭 및 삭제하기 기능

  const [dotMenuOpenMap, setDotMenuOpenMap] = useState<{
    [key: number]: boolean;
  }>({});
  const handleDotOpen = (id: number) => {
    setDotMenuOpenMap((prevState) => ({
      ...prevState,
      [id]: !prevState[id], // 해당 게시물의 상태를 토글
    }));
  };
  //  const [dotMenuOpenMap, setDotMenuOpenMap] = useState<{[key: number]: boolean;}>({});

  const handleDeleteClick = async (boardId: number) => {
    // boardId로 수정
    try {
      const response = await axios.delete(`${serverUrl}/${boardId}`, {
        headers: {
          Authorization: accessToken, // 토큰을 헤더에 추가
        },
      }); // URL에 boardId 추가
      if (response.status === 200) {
        // 삭제 성공 처리
        alert("삭제되었습니다");
        // 삭제한 게시물을 클라이언트 데이터에서도 제거
        const updatedBoardData = boardData.filter(
          (el) => el.boardId !== boardId
        ); // boardId로 수정
        setBoardData(updatedBoardData);
      } else {
        alert("삭제 되었습니다");
        window.location.href = "http://localhost:5173/community";
      }
    } catch (error) {
      console.error("데이터 삭제 중 오류 발생:", error);
      alert("삭제 되었습니다");
      console.log(boardData);
    }
  };

  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
  const toggleExpandPost = (boardId: number) => {
    setExpandedPosts((prevExpandedPosts) =>
      prevExpandedPosts.includes(boardId)
        ? prevExpandedPosts.filter((id) => id !== boardId)
        : [...prevExpandedPosts, boardId]
    );
  };

  return (
    <TimeLine>
      {openDropDown === false && (
        <Button onClick={handleSetOpenDropDown}></Button>
      )}

      {openDropDown === true && (
        <>
          <DropDownClose onClick={handleSetOpenDropDown}>
            <p>{timeLineText.close}</p>
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
            {timeLineText.notYetWriting}
          </BoardTextAreaNoText>
        ) : (
          boardData
            .slice()
            .reverse()
            .map((el: BoardData) => (
              <BoardTextArea key={el.boardId}>
                <Delete>
                  <div onClick={() => handleDotOpen(el.boardId)}>
                    <DotIcon />
                  </div>
                  {dotMenuOpenMap[el.boardId] && (
                    <DeleteBoard onClick={() => handleDeleteClick(el.boardId)}>
                      {timeLineText.delete}
                    </DeleteBoard>
                  )}
                </Delete>
                <BoardText>
                  {el.member}
                  {expandedPosts.includes(el.boardId) ? (
                    el.content
                  ) : (
                    <>
                      {el.content.length > 50
                        ? el.content.substring(0, 50) + "..."
                        : el.content}
                      <br />
                      {el.content.length > 50 && (
                        <div onClick={() => toggleExpandPost(el.boardId)}>
                          더 보기
                        </div>
                      )}
                    </>
                  )}
                </BoardText>
                <Comments
                  boardId={el.boardId}
                  commentId={el.comments.commentId}
                ></Comments>
              </BoardTextArea>
            ))
        )}
      </BoardArea>
    </TimeLine>
  );
};

export default TimeLineComponent;

interface BoardData {
  boardId: number;
  id: number;
  content: string;
  comments: string;
  member: string;
  createdAt: string; // 작성 시각
}
const timeLineText = {
  close: "닫기",
  notYetWriting: "아직 글이 작성되지 않았습니다",
  delete: "삭제하기",
};

//드롭다운 글작성 스타일 및 닫기버튼 스타일
const DropdownInput = styled.input`
  text-align: center;
  border: 0.1px solid#40797c;
  margin-left: 5%;
  width: 90%;
  height: 80px;
  outline: none;
  border-radius: 5px; // 모서리 둥글게 처리
  &:focus {
    border: 1px solid#40797c;
  }
`;

const DropDownClose = styled.div`
  text-align: right;
  cursor: pointer;
  color: #40797c;
  font-size: 30px; // x 아이콘 크기를 조절
  margin-right: 10px;
  &:hover {
    color: #2d4f51;
  }
`;

//글작성을위해 클릭시 드롭다운 열어주는 버튼

const Button = styled.button`
  background-color: white;
  color: darkslategray;
  border: 1px solid darkslategray;

  width: 300px;
  height: 30px;
  border-radius: 5px;
  margin: 0 auto;
  margin-bottom: 15px;

  &:hover {
    background-color: #f2f2f2;
    cursor: pointer;
  }
  &:after {
    content: "무슨 생각을하고 계신가요?";
    display: block;
    color: darkslategray;
    width: 100%;
  }
`;

//버튼 과 글영역 구분
const DevideLine2 = styled.div`
  margin-bottom: 10px;
  position: relative;
  margin-bottom: 30px;
  &:after {
    position: absolute;
    top: 5px;
    content: "";
    border-bottom: 1px solid#e1e1e1;
    display: block;
    width: 100%;
    height: 5px;
  }
`;

const DevideLine = styled.div`
  margin-bottom: 10px;
  position: relative;

  &:after {
    position: absolute;
    top: 5px;
    content: "";
    border-bottom: 1px solid#e1e1e1;
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

  height: calc(100vh - 194px);
  margin-top: 25px;
  width: 100%;
  overflow-y: auto; // 스크롤 설정

  ::-webkit-scrollbar {
    display: none;
  }
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

  ::-webkit-scrollbar {
    display: none;
  }
`;

const BoardContainer = styled.div`
  border-radius: 5px;
  overflow: hidden; // 내부의 둥근 모서리가 잘리지 않도록
  background-color: white; // 배경색 지정
  border: 1px solid lightslategray;

  margin: 10px;
`;

const BoardTextArea = styled.div`
  box-shadow: 1px 0px 7px 0px rgba(0, 0, 0, 0.3);
  width: 98%;
  border: 1px solid#f3f3f3;
  margin: 0 auto;
  padding-bottom: 10px;
  padding-top: 10px;
  color: #333;
`;
const BoardText = styled.div`
  margin-top: 10px;
  margin-left: 25px;
  max-width: 300px;
  min-height: 100px;
  height: 150px;
  max-height: 250px;
  text-align: left; // 왼쪽 정렬

  .memberName {
    font-weight: bold;
  }

  .createdAt {
    font-size: 12px;
    color: #888;
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .content {
    margin-top: 10px;
  }
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TimeLine = styled.div`
  display: flex;
  flex-direction: column;
  align-content: space-around;
  flex-wrap: wrap;

  ::-webkit-scrollbar {
    display: none;
  }
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
