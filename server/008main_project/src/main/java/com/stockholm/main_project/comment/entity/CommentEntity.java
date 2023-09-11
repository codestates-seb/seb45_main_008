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
    private Long commentId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "board_id") // board 엔티티와의 관계를 매핑합니다.
    private Board board; // 댓글이 속한 게시판
}
