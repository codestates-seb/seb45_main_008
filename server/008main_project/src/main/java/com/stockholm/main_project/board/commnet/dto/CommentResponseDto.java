package com.stockholm.main_project.board.commnet.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResponseDto {
    @Schema(description = "댓글 commentId", defaultValue = "1")
    private Long commentId;
    @Schema(description = "댓글 작성자", defaultValue = "TestAccount")
    private String member;
    @Schema(description = "댓글 내용", defaultValue = "TestComments")
    private String content;
    @Schema(description = "댓글 생성 날짜", defaultValue = "2023-11-10T10:51:17.549Z")
    private String createdAt;
    @Schema(description = "댓글 수정 날짜", defaultValue = "2023-12-10T10:51:17.549Z")
    private String ModifiedAt;
}
