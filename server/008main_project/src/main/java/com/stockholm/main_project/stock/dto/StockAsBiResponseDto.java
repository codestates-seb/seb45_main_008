package com.stockholm.main_project.stock.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockAsBiResponseDto {

    private long stockAsBiId;

    private long companyId;

    //매도 호가
    private String askp1;
    private String askp2;
    private String askp3;
    private String askp4;
    private String askp5;
    private String askp6;
    private String askp7;
    private String askp8;
    private String askp9;
    private String askp10;

    //매도 잔량
    private String askp_rsqn1;
    private String askp_rsqn2;
    private String askp_rsqn3;
    private String askp_rsqn4;
    private String askp_rsqn5;
    private String askp_rsqn6;
    private String askp_rsqn7;
    private String askp_rsqn8;
    private String askp_rsqn9;
    private String askp_rsqn10;

    //매수 호가
    private String bidp1;
    private String bidp2;
    private String bidp3;
    private String bidp4;
    private String bidp5;
    private String bidp6;
    private String bidp7;
    private String bidp8;
    private String bidp9;
    private String bidp10;

    //매수 잔량
    private String bidp_rsqn1;
    private String bidp_rsqn2;
    private String bidp_rsqn3;
    private String bidp_rsqn4;
    private String bidp_rsqn5;
    private String bidp_rsqn6;
    private String bidp_rsqn7;
    private String bidp_rsqn8;
    private String bidp_rsqn9;
    private String bidp_rsqn10;
}
