package com.stockholm.main_project.stock.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StockMinDto {
    private StockMinOutput1 output1;
    private List<StockMinOutput2> output2;

    @Getter
    @Setter
    @NoArgsConstructor
    public class StockMinOutput1 {
        //한글 종목 명
        private String hts_kor_isnm;
        //주식 현재가
        private String stck_prpr;
        //전일 대비
        private String prdy_vrss;
        //전일 대비율
        private String prdy_ctrt;
        //누적 거래량
        private String acml_vol;
        //누적 거래대금
        private String acml_tr_pbmn;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class StockMinOutput2 {
        //주식 체결 시간
        private String stck_cntg_hour;
        //주식 현재가
        private String stck_prpr;
        //주식 시가
        private String stck_oprc;
        //주식 최고가
        private String stck_hgpr;
        //주식 최저가
        private String stck_lwpr;
        //체결 거래량
        private String cntg_vol;
    }
}
