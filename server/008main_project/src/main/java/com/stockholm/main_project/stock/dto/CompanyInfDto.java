package com.stockholm.main_project.stock.dto;

import lombok.*;

@Setter
@Getter
@NoArgsConstructor
public class CompanyInfDto {
    private CompanyInfOutput output;

    @Getter
    @Setter
    @NoArgsConstructor
    public class CompanyInfOutput {
        // 상장 주수
        private String lstn_stcn;
        // 시가 총액
        private String hts_avls;
        // 52주 최고가
        private String w52_hgpr;
        // 52주 최저가
        private String w52_lwpr;
    }

}
