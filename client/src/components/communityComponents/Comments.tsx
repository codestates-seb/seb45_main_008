import { useState } from "react";
import styled from "styled-components";
import { useGetMemberInfo } from "../../hooks/useGetMemberInfo"; 

interface CommentData {
  id: number;
  comments: string;
  authorName: string;  // 작성자 이름
  createdAt: string;   // 작성 시각
}

const Comments = ({ boardId }: { boardId: number }) => {
  const [commentData, setCommentData] = useState<CommentData[]>(() => {
    const storedData = localStorage.getItem(`commentData_${boardId}`);
    return storedData ? JSON.parse(storedData) : [];
  });

  const [commentsValue, setCommentsValue] = useState("");

  const { data: memberInfo } = useGetMemberInfo();

  const authorName = memberInfo ? memberInfo.name : "Unknown";  

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentsValue(e.target.value);
  };

  const handleClickSubmit = () => {
    if (commentsValue) {
      const newCommentData: CommentData = {
        id: new Date().getTime(),
        comments: commentsValue,
        authorName: authorName,  // 실제 멤버 이름 사용
        createdAt: new Date().toLocaleString()
      };

      setCommentData((prevCommentData) => [...prevCommentData, newCommentData]);
      localStorage.setItem(`commentData_${boardId}`, JSON.stringify([...commentData, newCommentData]));
      setCommentsValue("");
    }
  };

  const [visibleComments, setVisibleComments] = useState(1);
  const [close, setClose] = useState(true);
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
          placeholder="댓글달기"
        />
        <CommentInputSubmit onClick={() => handleClickSubmit()}>{CommentText.write}</CommentInputSubmit>
        <CommentCount onClick={handleShowMoreComments}>
          {CommentText.replyCount}
          {commentData.length}
          {close ? CommentText.replyText : CommentText.replyHide}
        </CommentCount>
        
        {close ? null : commentData.slice(0, visibleComments).map((el) => (
          <CommentsDiv key={el.id}>
            <CommentAuthor>{el.authorName}</CommentAuthor> 
            <CommentDate>{el.createdAt}</CommentDate>
            <CommentTextDiv>{el.comments}</CommentTextDiv> {/* 여기에서 >> 기호를 제거했습니다. */}
          </CommentsDiv>
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
