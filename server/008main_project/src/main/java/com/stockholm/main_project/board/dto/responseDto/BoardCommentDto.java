package com.stockholm.main_project.board.dto.responseDto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardCommentDto {
    @Schema(description = "commentId", defaultValue = "1")
    private long commentId; // 추가
    @Schema(description = "댓글 내용", defaultValue = "TestComment")
    private String content;
    @Schema(description = "댓글 작성자", defaultValue = "TestAccount")
    private String member;
    @Schema(description = "댓글 생성 날짜", defaultValue = "2023-11-10T10:51:17.549Z")
    private String createdAt;
    @Schema(description = "댓글 수정 날짜", defaultValue = "2023-12-10T10:51:17.549Z")
    private String ModifiedAt;
}
