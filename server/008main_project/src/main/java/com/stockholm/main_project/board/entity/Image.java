//package com.stockholm.main_project.board.entity;
//
//import com.stockholm.main_project.audit.Auditable;
//import com.stockholm.main_project.member.entity.Member;
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//
//@Entity // 엔티티로 사용한다고 명시
//@Table(name = "images") // 테이블 이름을 명시 (원하는 이름으로 변경 가능)
//@Getter
//@Setter
//@NoArgsConstructor
//public class Image extends Auditable {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long imageId;
//
//    @ManyToOne
//    @JoinColumn(name = "board_id") // 외래키의 컬럼 이름을 명시
//    private Board board;
//
//    @Column
//    private String imageUrl;
//}
