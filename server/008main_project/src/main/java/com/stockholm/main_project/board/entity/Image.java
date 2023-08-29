package com.stockholm.main_project.board.entity;

import com.stockholm.main_project.audit.Auditable;
import com.stockholm.main_project.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
public class Image extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long imageId;

    @ManyToOne
    @JoinColumn(name = "BOARD_ID")
    private Board board;

    @Column
    private String imageUrl;
}