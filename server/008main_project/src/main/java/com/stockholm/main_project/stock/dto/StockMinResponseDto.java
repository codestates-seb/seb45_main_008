package com.stockholm.main_project.stock.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StockMinResponseDto {
    private long stockMinId;

    private long companyId;

    private LocalDateTime stockTradeTime;

    //주식 체결 시간(문자열)
    private String stck_cntg_hour;
    //주식 현재가
    private String stck_prpr;
    //주식 시가
    private String stck_oprc;
    //주식 최고가
    private String stck_hgpr;
    //주식 최저가
    private String stck_lwpr;
}
