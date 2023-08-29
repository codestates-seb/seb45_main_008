package com.stockholm.main_project.member.entity;

import com.stockholm.main_project.audit.Auditable;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Cash extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cashId;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @Column
    private long money;

}
