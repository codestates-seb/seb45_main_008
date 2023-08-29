package com.stockholm.main_project.stock.stockdata.dto;

import lombok.*;

import javax.persistence.Entity;


@Data
@NoArgsConstructor
public class StockasbiDataDto {
    private String askp1, askp2, askp3, askp4, askp5;
    private String bidp1, bidp2, bidp3, bidp4, bidp5;
    private String askp_rsqn1, askp_rsqn2, askp_rsqn3, askp_rsqn4, askp_rsqn5;
    private String bidp_rsqn1, bidp_rsqn2, bidp_rsqn3, bidp_rsqn4, bidp_rsqn5;

    private String stck_prpr;
    private String stck_oprc;
    private String stck_hgpr;
    private String stck_lwpr;
    private String stck_sdpr;
}
