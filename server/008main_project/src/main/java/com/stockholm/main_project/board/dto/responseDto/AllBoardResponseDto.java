package com.stockholm.main_project.board.dto.responseDto;

import com.stockholm.main_project.board.commnet.dto.CommentResponseDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class AllBoardResponseDto {
    @Schema(description = "BoardId", defaultValue = "1")
    private Long boardId;
    @Schema(description = "게시글 제목", defaultValue = "1")
    private String title;
    @Schema(description = "게시글 내용", defaultValue = "TestContent")
    private String content;
    @Schema(description = "게시글 작석자", defaultValue = "TestAccount")
    private String member;
    @Schema(description = "게시글에 포함된 댓글", defaultValue = "TestComments")
    private List<BoardCommentDto> comments;
    @Schema(description = "게시글 생성 날짜", defaultValue = "2023-10-10T10:51:17.549Z")
    private String createdAt;
    @Schema(description = "게시글 수정 날짜", defaultValue = "2023-11-10T10:51:17.549Z")
    private String modifiedAt;


}
