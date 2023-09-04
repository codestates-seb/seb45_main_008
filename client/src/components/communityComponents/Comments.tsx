import { useState } from "react";
import styled from "styled-components";

const Comments = ({ postId }: { postId: number }) => {
  interface CommentData {
    id: number;
    comments: string;
  }
  const [commentData, setCommentData] = useState<CommentData[]>(() => {
    // 게시물별로 로컬 스토리지에서 댓글 데이터를 가져옵니다.
    const storedData = localStorage.getItem(`commentData_${postId}`);
    return storedData ? JSON.parse(storedData) : [];
  });

  const [commentsValue, setCommentsValue] = useState("");

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentsValue(e.target.value);
  };

  const handleClickSubmit = () => {
    if (commentsValue) {
      const newCommentData: CommentData = {
        id: new Date().getTime(),

        comments: commentsValue,
      };

      // 댓글 데이터를 업데이트합니다.
      setCommentData((prevCommentData) => [...prevCommentData, newCommentData]);

      // 게시물 ID에 따라 로컬 스토리지에 댓글 데이터를 저장합니다.
      localStorage.setItem(
        `commentData_${postId}`,
        JSON.stringify([...commentData, newCommentData])
      );

      // 댓글 입력창 초기화
      setCommentsValue("");
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
          작성
        </CommentInputSubmit>
        <CommentCount onClick={handleShowMoreComments}>
          댓글{commentData.length}개 모두 보기
        </CommentCount>
        {commentData.slice(0, visibleComments).map((el) => (
          <CommentsDiv key={el.id}>&#187; {el.comments}</CommentsDiv>
        ))}
      </div>
    </CommentContainer>
  );
};

export default Comments;
const CommentInput = styled.input`
  border: 1px solid#40797c;
  outline: none;
  width: 280px;
`;
const CommentInputSubmit = styled.button`
  outline: none;
  border: 1px solid#40797;
  background-color: #40797;
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