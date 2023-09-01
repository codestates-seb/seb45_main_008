//package com.stockholm.main_project.stock.entity;
//
//import lombok.Getter;
//import lombok.NoArgsConstructor;
//import lombok.Setter;
//
//import javax.persistence.*;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//public class StockInf {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long stockInfId;
//
//    @OneToOne
//    @JoinColumn(name = "COMPANY_ID")
//    private Company company;
//
//    //주식 현재가
//    @Column
//    private String stck_prpr;
//    //전일 대비
//    @Column
//    private String prdy_vrss;
//    //전일 대비율
//    @Column
//    private String prdy_ctrt;
//    //누적 거래량
//    @Column
//    private String acml_vol;
//    //누적 거래대금
//    @Column
//    private String acml_tr_pbmn;
//}
