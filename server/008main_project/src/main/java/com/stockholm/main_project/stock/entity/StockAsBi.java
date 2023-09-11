package com.stockholm.main_project.stock.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StockAsBi {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockAsBiId;

    @OneToOne
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

    //매도 호가
    @Column
    private String askp1;
    @Column
    private String askp2;
    @Column
    private String askp3;
    @Column
    private String askp4;
    @Column
    private String askp5;

    //매도 잔량
    @Column
    private String askp_rsqn1;
    @Column
    private String askp_rsqn2;
    @Column
    private String askp_rsqn3;
    @Column
    private String askp_rsqn4;
    @Column
    private String askp_rsqn5;

    //매수 호가
    @Column
    private String bidp1;
    @Column
    private String bidp2;
    @Column
    private String bidp3;
    @Column
    private String bidp4;
    @Column
    private String bidp5;

    //매수 잔량
    @Column
    private String bidp_rsqn1;
    @Column
    private String bidp_rsqn2;
    @Column
    private String bidp_rsqn3;
    @Column
    private String bidp_rsqn4;
    @Column
    private String bidp_rsqn5;
}
