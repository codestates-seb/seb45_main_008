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
        commentId: 0,
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

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await axios.delete(
        `http://ec2-13-125-246-160.ap-northeast-2.compute.amazonaws.com:8080/api/boards/${boardId}/comments/${commentId}`,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      if (response.status === 200) {
        // 삭제 성공 처리
        alert("댓글이 삭제되었습니다");

        const updatedCommentData = commentData.filter(
          (el: CommentContent) => el.id !== commentId
        );
        setCommentData(updatedCommentData);
      } else {
        alert("댓글 삭제 실패");
      }
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
      alert("댓글 삭제 실패");
    }
  };

  const [visibleComments, setVisibleComments] = useState(1);
  const [close, setClose] = useState(true);
  const handleShowMoreComments = () => {
    setClose(!close);
    setVisibleComments(close ? 1 : commentData.length);
  };
  const getTimeAgoString = (createdAt: string): string => {
    const currentTime: Date = new Date();
    const createdAtTime: Date = new Date(createdAt);

    const timeDifferenceInMilliseconds: number =
      currentTime.getTime() - createdAtTime.getTime();
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
            <div>
              &#187; <CommentAuthor>{el.member}</CommentAuthor>
              <CommentDate>{getTimeAgoString(el.createdAt)}</CommentDate>
            </div>
            <CommentTextDiv>{el.content}</CommentTextDiv>
            <CommentDeleteButton onClick={() => handleDeleteComment(el.id)}>
              삭제
            </CommentDeleteButton>
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
  currentTime: number;
  createdAtTime: number;
  commentId: number;
}
const CommentText = {
  write: "작성",
  replyCount: "댓글",
  replyText: "개 모두보기",
  replyHide: "개 숨기기",
};

const CommentInput = styled.input`
  border: none;
  outline: none;
  width: 280px;
  height: 35px;
  padding: 10px 15px;
  border-radius: 5px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
`;

const CommentInputSubmit = styled.button`
  outline: none;
  border: 1px solid black;
  background-color: white;
  color: black;
  padding: 10px 15px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f2f2f2;
  }
`;
const CommentDeleteButton = styled.div``;
const CommentContainer = styled.div`
  display: flex;
  justify-content: space-around;
  text-align: left;
  padding: 0px;
  border-radius: 5px;
`;

const CommentsDiv = styled.div`
  padding-bottom: 5px;
  margin-top: 5px;
  background-color: white;
  padding: 0px 10px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const CommentCount = styled.div`
  color: #c3c3c3;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  margin-right: 10px;
`;

const CommentDate = styled.span`
  color: #888;
  font-size: 12px;
  margin-bottom: 5px;
`;

const CommentTextDiv = styled.div`
  margin-top: 5px;
`;
