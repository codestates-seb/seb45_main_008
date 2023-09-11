package com.stockholm.main_project.comment.dto;

public class CommentDto {
    private Long id;
    private String content; // 댓글 내용
    private Long postId; // 댓글이 속한 게시물 ID

    // 생성자, getter 및 setter

    public CommentDto() {
        // 기본 생성자
    }

    // 생성자에서 content와 postId 설정
    public CommentDto(String content, Long postId) {
        this.content = content;
        this.postId = postId;
    }
    public Long getId() {  // 추가된 메소드
        return id;
    }

    public void setId(Long id) {  // 추가된 메소드
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getPostId() {
        return postId;
    }

    public void setPostId(Long postId) {
        this.postId = postId;
    }
}



