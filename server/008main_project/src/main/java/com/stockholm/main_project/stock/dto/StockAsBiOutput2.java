package com.stockholm.main_project.stock.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StockAsBiOutput2 {

    //주식 현재가
    private String stck_prpr;
    //주식 시가
    private String stck_oprc;
    //주식 최고가
    private String stck_hgpr;
    //주식 최저가
    private String stck_lwpr;
    //주식 기준가
    private String stck_sdpr;
}
