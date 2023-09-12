package com.stockholm.main_project.board.dto.responseDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BoardCommentDto {
    private long commentId; // 추가
    private String content;
    private String member;
    private String createdAt;
    private String lastModifiedAt;
}
