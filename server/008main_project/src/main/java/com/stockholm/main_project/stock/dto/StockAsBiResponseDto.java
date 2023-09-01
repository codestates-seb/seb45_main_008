package com.stockholm.main_project.stock.dto;

import com.stockholm.main_project.stock.entity.Company;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

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
