package com.stockholm.main_project.stock.stockdata.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StockminDto {
    private String htsKorIsnm;        // HTS 한글 종목명
    private String stckPrdyClpr;     // 주식 전일 종가
    private String acmlVol;          // 누적 거래량
    private String stckPrpr;         // 주식 현재가
    private String stckOprc;         // 주식 시가2
    private String stckHgpr;         // 주식 최고가
    private String stckLwpr;         // 주식 최저가
}
