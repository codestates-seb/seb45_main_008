import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Comments = ({ boardId }: { boardId: number }) => {
  ///api/boards/{boardId}/comment/
  interface CommentData {
    id: number;
    comments: string;
  }
  const [commentData, setCommentData] = useState<CommentData[]>([]);
  const [commentsValue, setCommentsValue] = useState("");
  useEffect(() => {
    // 게시물 ID를 기반으로 서버에서 댓글 데이터를 가져옵니다.
    fetchCommentsFromServer();
  }, [boardId]);

  const fetchCommentsFromServer = async () => {
    try {
      const response = await axios.get(`/api/boards/${boardId}/comment`);
      setCommentData(response.data);
    } catch (error) {
      console.error("댓글 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentsValue(e.target.value);
  };
  const authToken = localStorage.getItem("authToken"); // 로컬스토리지 토큰 가져오기
  const handleClickSubmit = async () => {
    if (commentsValue) {
      const newCommentData: CommentData = {
        id: new Date().getTime(),
        comments: commentsValue,
      };

      try {
        // 서버에 댓글 데이터를 POST합니다.
        const response = await axios.post(
          `/api/boards/${boardId}/comment`,
          newCommentData,
          {
            headers: {
              Authorization: authToken, // 토큰을 헤더에 추가
            },
          }
        );
        if (response.status === 201) {
          // 서버에 성공적으로 데이터를 업로드한 경우
          setCommentsValue("");
          // 서버에서 업데이트된 댓글 목록을 다시 가져오기
          fetchCommentsFromServer();
        } else {
          console.log("댓글 작성 실패:", response.data);
        }
      } catch (error) {
        console.error("댓글 작성 중 오류 발생:", error);
      }
    }
  };
  // 보여지는 댓글 수 제한 및 더보기 버튼 클릭시 모든댓글이 보이도록 설정
  const [visibleComments, setVisibleComments] = useState(1);
  const [close, setClose] = useState(false);
  //true이면 setVisibleComments 실행 false 이면 setVisibleComments가 1
  const handleShowMoreComments = () => {
    setClose(!close);
    setVisibleComments(close ? 1 : commentData.length);
  };

  return (
    <CommentContainer>
      <div>
        <CommentInput
          type="text"
          value={commentsValue}
          onChange={handleOnChange}
        />
        <CommentInputSubmit onClick={() => handleClickSubmit()}>
          {CommentText.write}
        </CommentInputSubmit>
        <CommentCount onClick={handleShowMoreComments}>
          {CommentText.replyCount}
          {commentData.length}
          {CommentText.replyText}
        </CommentCount>
        {commentData.slice(0, visibleComments).map((el) => (
          <CommentsDiv key={el.id}>&#187; {el.comments}</CommentsDiv>
        ))}
      </div>
    </CommentContainer>
  );
};

export default Comments;

const CommentText = {
  write: "작성",
  replyCount: "댓글",
  replyText: "개 모두보기",
};

const CommentInput = styled.input`
  border: 1px solid#40797c;
  outline: none;
  width: 280px;
`;

const CommentInputSubmit = styled.button`
  outline: none;
  border: 1px solid#400797;
  background-color: #400797;
  color: white;
`;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: left;
`;
const CommentsDiv = styled.div`
  padding-bottom: 5px;
  margin-top: 5px;
`;
const CommentCount = styled.div`
  color: #c3c3c3;
  font-size: 14px;
  cursor: pointer;
`;
