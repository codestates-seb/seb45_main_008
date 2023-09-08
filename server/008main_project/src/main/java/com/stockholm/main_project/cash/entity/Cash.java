package com.stockholm.main_project.cash.entity;

import com.stockholm.main_project.member.entity.Member;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
public class Cash {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long moneyId;

    @Column(nullable = false)
    private String money;

    @JoinColumn(name = "MEMBER_ID")
    @OneToOne(fetch = FetchType.LAZY)
    private Member member;

    @Column(nullable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(nullable = false)
    @LastModifiedDate
    private LocalDateTime lastModifiedAt;
}
