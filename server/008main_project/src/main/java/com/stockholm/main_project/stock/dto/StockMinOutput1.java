package com.stockholm.main_project.stock.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StockMinOutput1 {
    //한글 종목 명
    private String hts_kor_isnm;
    //주식 현재가
    private String stck_prpr;
}
