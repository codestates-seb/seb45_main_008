package com.stockholm.main_project.comment.entity;

import com.stockholm.main_project.board.entity.Board;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    @JoinColumn(name = "board_id") // board 엔티티와의 관계를 매핑합니다.
    private Board board; // 댓글이 속한 게시판

    // 생성자 및 필요한 메서드

    public CommentEntity() {
        // 기본 생성자
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Board getBoard() { // getter 메서드를 수정
        return board;
    }

    public void setBoard(Board board) { // setter 메서드를 수정
        this.board = board;
    }
}
