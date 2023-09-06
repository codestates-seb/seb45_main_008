package com.stockholm.main_project.board.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.stockholm.main_project.comment.dto.CommentDto;

import java.util.List;

public class BoardDto {
    private Long boardId;
    private String title;
    private String content;
    private String img;
    private Long memberId;

    private List<CommentDto> comments; // 댓글 정보를 저장할 필드

    // Getter 및 Setter 메서드

    public Long getBoardId() {
        return boardId;
    }

    public void setBoardId(Long boardId) {
        this.boardId = boardId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public Long getMemberId() {
        return memberId;
    }

    public void setMemberId(Long memberId) {
        this.memberId = memberId;
    }

    public List<CommentDto> getComments() {
        return comments;
    }

    public void setComments(List<CommentDto> comments) {
        this.comments = comments;
    }
}
