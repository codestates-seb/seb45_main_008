package com.stockholm.main_project.board.commnet.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentRequestDto {
    @Schema(description = "댓글 내용", defaultValue = "TestComments")
    private String content;
}
