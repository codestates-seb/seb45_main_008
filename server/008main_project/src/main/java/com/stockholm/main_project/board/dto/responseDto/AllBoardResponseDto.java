package com.stockholm.main_project.board.dto.responseDto;

import com.stockholm.main_project.board.commnet.dto.CommentResponseDto;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AllBoardResponseDto {
    private Long boardId;
    private String title;
    private String content;
    private String member;
    private List<BoardCommentDto> comments;
    private String createdAt;
    private String modifiedAt;

}
