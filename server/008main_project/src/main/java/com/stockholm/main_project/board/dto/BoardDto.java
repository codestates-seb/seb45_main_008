package com.stockholm.main_project.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public class BoardDto {
    @Schema(description = "게시물 ID", example = "1")
    private long id;

    @Schema(description = "게시물 제목", defaultValue = "제목 없음")
    private String title;

    @Schema(description = "게시물 내용", defaultValue = "내용 없음")
    private String body;

    @Schema(description = "이미지 URL")
    private String img;

    @Schema(description = "회원 ID", example = "101")
    private long memberId;

    @Schema(description = "댓글 ID", example = "201")
    private long commentId;

    // Getter 및 Setter 메서드 생략
}
