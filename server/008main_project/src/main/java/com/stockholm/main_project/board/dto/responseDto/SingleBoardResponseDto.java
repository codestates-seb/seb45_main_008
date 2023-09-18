package com.stockholm.main_project.board.dto.responseDto;



import com.stockholm.main_project.board.commnet.dto.CommentResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

// 게시판 응답 형식 클래스
@Getter
@Setter
public class SingleBoardResponseDto {
    private Long boardId;
    private String title;
    private String content;
    private String member;
    private String createdAt;
    private String modifiedAt;
    private List<BoardCommentDto> comments;

}
