package com.stockholm.main_project.board.commnet.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentResponseDto {
    private Long commentId;
    private String member;
    private String content;
    private String createdAt;
    private String ModifiedAt;
}
