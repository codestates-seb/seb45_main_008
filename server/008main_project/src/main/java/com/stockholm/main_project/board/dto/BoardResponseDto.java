package com.stockholm.main_project.board.dto;


import com.stockholm.main_project.comment.Response.CommentResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

// 게시판 응답 형식 클래스
@Getter
@Setter
public class BoardResponseDto {
    private Long id;
    private String title;
    private String content;
    private String createdAt;
    private String modifiedAt;
    private List<CommentResponse> comments;

    // 각 필드에 대한 getter 및 setter 메서드
}
