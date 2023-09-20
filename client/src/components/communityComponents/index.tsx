import { useState, useEffect } from "react";
import styled from "styled-components";
import Comments from "./Comments";
import { DotIcon } from "./IconComponent/Icon";
import { toast } from "react-toastify";
import axios from "axios";

const serverUrl = "http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/api/boards";

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
  const getTimeAgoString = (createdAt: string): string => {
    const currentTime: Date = new Date();
    const createdAtTime: Date = new Date(createdAt);

    const timeDifferenceInMilliseconds: number = currentTime.getTime() - createdAtTime.getTime();
    const timeDifferenceInSeconds = Math.floor(timeDifferenceInMilliseconds / 1000);

    if (timeDifferenceInSeconds < 60) {
      return "방금 전";
    } else if (timeDifferenceInSeconds < 3600) {
      const minutesAgo = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutesAgo}분 전`;
    } else if (timeDifferenceInSeconds < 86400) {
      const hoursAgo = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hoursAgo}시간 전`;
    } else {
      const daysAgo = Math.floor(timeDifferenceInSeconds / 86400);
      return `${daysAgo}일 전`;
    }
  };

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

      // 로그인 토큰 확인
    if (!accessToken) {
      toast.error("로그인이 필요한 서비스입니다", {
        autoClose: 1000,
      });
      return;
    }
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
          toast.success("작성 되었습니다", {
            autoClose: 1000,
          });
          setinputValue(""); // 입력 필드 초기화

          fetchBoardDataFromServer();
        } else {
          toast.error("작성실패", {
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.log("데이터 추가 중 오류 발생:", error);
        toast.error("작성실패", {
          autoClose: 1000,
        });
      }
    } else {
      toast.info("내용이 없습니다", {
        autoClose: 1000,
      });
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

        // 삭제한 게시물을 클라이언트 데이터에서도 제거
        const updatedBoardData = boardData.filter((el) => el.boardId !== boardId); // boardId로 수정
        setBoardData(updatedBoardData);
      } else {
        toast.success("삭제 되었습니다", {
          autoClose: 1000,
        });
        window.location.href = "/community";
      }
    } catch (error) {
      console.error("작성자만 삭제 할 수 있습니다:", error);
      toast.info("작성자만 삭제할 수 있습니다", {
        autoClose: 1000,
      });
    }
  };

  const [expandedPosts, setExpandedPosts] = useState<number[]>([]);
  const toggleExpandPost = (boardId: number) => {
    setExpandedPosts((prevExpandedPosts) => (prevExpandedPosts.includes(boardId) ? prevExpandedPosts.filter((id) => id !== boardId) : [...prevExpandedPosts, boardId]));
  };

  return (
    <TimeLine>
      {openDropDown === false && <Button onClick={handleSetOpenDropDown}></Button>}
      {openDropDown === true && (
        <>
          <DropdownInput type="text" placeholder="이곳에 작성해 주세요" value={inputValue} onChange={handleOnChange}></DropdownInput>

          <ButtonContainer>
            <SubmitButton onClick={handleClickSubmit}>Submit</SubmitButton>
            <CloseButton onClick={handleSetOpenDropDown}>Cancel</CloseButton>
          </ButtonContainer>
        </>
      )}
      <DevideLine></DevideLine>
      <BoardArea dropDown={openDropDown}>
        {boardData.length === 0 ? (
          <BoardTextAreaNoText>{timeLineText.notYetWriting}</BoardTextAreaNoText>
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
                  {dotMenuOpenMap[el.boardId] && <DeleteBoard onClick={() => handleDeleteClick(el.boardId)}>{timeLineText.delete}</DeleteBoard>}
                </Delete>
                <BoardText>
                  <MemberInfo>
                    <MemberName>{el.member}</MemberName>
                    <div>{getTimeAgoString(el.createdAt)}</div>
                  </MemberInfo>

                  {expandedPosts.includes(el.boardId) ? (
                    el.content
                  ) : (
                    <>
                      {el.content.length > 50 ? el.content.substring(0, 50) + "..." : el.content}
                      <br />
                      {el.content.length > 50 && <div onClick={() => toggleExpandPost(el.boardId)}>더 보기</div>}
                    </>
                  )}
                </BoardText>
                <Comments boardId={el.boardId}></Comments>
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
  commentId: number;
}
const timeLineText = {
  close: "닫기",
  notYetWriting: "아직 글이 작성되지 않았습니다",
  delete: "삭제하기",
};

//드롭다운 글작성 스타일 및 닫기버튼 스타일.
const MemberInfo = styled.div`
  display: flex;
  :nth-child(1) {
    width: 80%;
  }
  :nth-child(2) {
    font-size: 12px;
    margin-top: 1px;
    margin-left: 10px;

    color: rgba(0, 0, 0, 0.7);
  }
`;
const MemberName = styled.div`
  margin-bottom: 15px;
`;
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

const Button = styled.button`
  background-color: white;
  color: darkslategray;
  border: 1px solid rgba(0, 0, 0, 0.5);

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

const ButtonContainer = styled.div`
  padding-top: 12px;
  padding-left: 10px;
  padding-right: 10px;

  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SubmitButton = styled.button`
  display: block;
  width: 43.8%;
  height: 33px;
  color: #fff;
  border: none;
  background-color: #40797c;
  cursor: pointer;
  border-radius: 0.3rem;
  margin: 5px auto;
  &:hover {
    background-color: #2d4f51;
  }
  &:focus {
    border-style: inset;
    border-color: #40797c;
  }
`;

const CloseButton = styled(SubmitButton)``;

//게시판 전체 영역
const BoardArea = styled.div<{ dropDown: boolean }>`
  text-align: center;
  height: ${(props) => (props.dropDown ? "calc(100vh - 290px)" : "calc(100vh - 200px)")};
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

const BoardTextArea = styled.div`
  width: 98%;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.4);
  border-left: 1px solid rgba(0, 0, 0, 0.03);
  border-bottom: 1px solid rgba(0, 0, 0, 0.6);
  margin: 0 auto;
  padding-bottom: 10px;
  padding-top: 10px;
  color: #333;
  margin-bottom: 5px;
`;
const BoardText = styled.div`
  margin-top: 10px;
  margin-left: 55px;
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
