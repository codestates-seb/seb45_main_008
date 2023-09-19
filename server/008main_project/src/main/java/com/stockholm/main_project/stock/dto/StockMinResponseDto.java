package com.stockholm.main_project.stock.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class StockMinResponseDto {
    @Schema(description = "주식 분봉 아이디", defaultValue = "1")
    private long stockMinId;
    @Schema(description = "주식 회사 아이디", defaultValue = "1")
    private long companyId;
    @Schema(description = "LocalDateTime 시간", defaultValue = "2023-09-04 10:01:00")
    private LocalDateTime stockTradeTime;

    //주식 체결 시간(문자열)
    @Schema(description = "HHMMSS 시간", defaultValue = "100100")
    private String stck_cntg_hour;
    //주식 현재가
    @Schema(description = "주식 현재가", defaultValue = "7600")
    private String stck_prpr;
    //주식 시가
    @Schema(description = "주식 시가", defaultValue = "7400")
    private String stck_oprc;
    //주식 최고가
    @Schema(description = "주식 최고가", defaultValue = "8200")
    private String stck_hgpr;
    //주식 최저가
    @Schema(description = "주식 최저가", defaultValue = "7200")
    private String stck_lwpr;
    @Schema(description = "체결 거래량", defaultValue = "32000")
    private String cntg_vol;
}
