package com.stockholm.main_project.board.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.stockholm.main_project.audit.Auditable;
import com.stockholm.main_project.comment.entity.CommentEntity;
import com.stockholm.main_project.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Board extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // id 필드명을 boardId에서 id로 수정

    @Column
    private String title;

    @Column
    private String content;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @OneToMany(mappedBy = "board", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("board") // board 필드는 JSON 직렬화에서 제외하지 않음
    private List<CommentEntity> comments = new ArrayList<>();

    // getId() 메서드 추가
    public Long getId() {
        return id;
    }

    // setId() 메서드 추가
    public void setId(Long id) {
        this.id = id;
    }
}
