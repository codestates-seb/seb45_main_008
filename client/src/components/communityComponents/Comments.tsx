import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Comments = ({ boardId }: { boardId: number }) => {
  const [commentData, setCommentData] = useState([]);
  const [commentsValue, setCommentsValue] = useState("");

  useEffect(() => {
    // 게시물 ID를 기반으로 서버에서 댓글 데이터를 가져옵니다.
    fetchCommentsFromServer();
  }, [boardId]);

  const fetchCommentsFromServer = async () => {
    try {
      const response = await axios.get(
        `http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/api/boards/${boardId}`
      );

      // 게시판 데이터에서 댓글 부분을 추출합니다.
      const comments = response.data.comments || [];

      setCommentData(comments);
    } catch (error) {
      console.error("댓글 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentsValue(e.target.value);
  };

  const accessToken = localStorage.getItem("accessToken");

  const handleClickSubmit = async () => {
    if (commentsValue) {
      const newCommentData = {
        content: commentsValue,
        member: "test3", // 변경 가능
        createdAt: new Date().toISOString(),
        modifiedAt: new Date().toISOString(),
      };

      try {
        const response = await axios.post(
          `http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/api/boards/${boardId}/comments`,
          newCommentData,
          {
            headers: {
              Authorization: accessToken,
            },
          }
        );
        if (response.status === 201) {
          setCommentsValue("");
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
  const getTimeAgoString = (createdAt: string): string => {
    const currentTime = new Date();
    const createdAtTime = new Date(createdAt);

    const timeDifferenceInMilliseconds = currentTime - createdAtTime;
    const timeDifferenceInSeconds = Math.floor(
      timeDifferenceInMilliseconds / 1000
    );

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

  return (
    <CommentContainer>
      <div>
        <CommentInput
          type="text"
          value={commentsValue}
          onChange={handleOnChange}
        />
        <CommentInputSubmit onClick={handleClickSubmit}>
          {CommentText.write}
        </CommentInputSubmit>
        <CommentCount onClick={handleShowMoreComments}>
          {CommentText.replyCount} {commentData.length} {CommentText.replyText}
        </CommentCount>
        {commentData.slice(0, visibleComments).map((el: CommentContent) => (
          <CommentsDiv key={el.id}>
            &#187;
            <div>
              <div>{el.member}</div>
              <div>{getTimeAgoString(el.createdAt)}</div>
            </div>
            <div>{el.content}</div>
          </CommentsDiv>
        ))}
      </div>
    </CommentContainer>
  );
};

export default Comments;

interface CommentContent {
  id: number;
  content: string;
  member: string;
  createdAt: string;
}
const CommentText = {
  write: "작성",
  replyCount: "댓글",
  replyText: "개 모두보기",
};

const CommentInput = styled.input`
  border: 1px solid #40797c;
  outline: none;
  width: 80%;
`;

const CommentInputSubmit = styled.button`
  outline: none;
  border: 1px solid #400797;
  background-color: #400797;
  color: white;
`;

const CommentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: left;
  width: 100%;
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
