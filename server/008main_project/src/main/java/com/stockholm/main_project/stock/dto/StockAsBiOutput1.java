package com.stockholm.main_project.stock.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StockAsBiOutput1 {

    // 호가 접수 시간
    private String aspr_acpt_hour;

    //매도 호가
    private String askp1;
    private String askp2;
    private String askp3;
    private String askp4;
    private String askp5;

    //매도 잔량
    private String askp_rsqn1;
    private String askp_rsqn2;
    private String askp_rsqn3;
    private String askp_rsqn4;
    private String askp_rsqn5;

    //매수 호가
    private String bidp1;
    private String bidp2;
    private String bidp3;
    private String bidp4;
    private String bidp5;

    //매수 잔량
    private String bidp_rsqn1;
    private String bidp_rsqn2;
    private String bidp_rsqn3;
    private String bidp_rsqn4;
    private String bidp_rsqn5;

}
