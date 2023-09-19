package com.stockholm.main_project.member.entity;

import com.stockholm.main_project.audit.Auditable;
import com.stockholm.main_project.cash.entity.Cash;
import lombok.Builder;
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
public class Member extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    @Column(length = 30, nullable = false)
    private String email;

    @Column(length = 10, nullable = false)
    private String name;

    @Column(length = 255, nullable = true)
    private String password;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private Cash cash;

    @Transient
    private String confirmPassword; //실제 저장을 하지 않기 위해 @Transient 사용

    @Enumerated(value = EnumType.STRING)
    @Column(length = 20, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public enum MemberStatus {
        MEMBER_ACTIVE("활동중"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }
//    @Builder MemberMapper에서 PostDto의 confirmPassword 객체를 인식하지 못해 아래와 같이 변경
//    public Member(String name, String email, String password, List<String> roles) {
//        this.name = name;
//        this.email = email;
//        this.password = password;
//        this.roles = roles;
//    }
    @Builder // Mapper에서 사용하도록 추가
    public Member(String name, String email, String password, List<String> roles, String confirmPassword) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.confirmPassword = confirmPassword;
    }
}
