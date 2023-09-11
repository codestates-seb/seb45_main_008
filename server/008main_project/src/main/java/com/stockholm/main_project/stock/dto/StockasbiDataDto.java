package com.stockholm.main_project.stock.dto;

import lombok.*;


@Data
@NoArgsConstructor
public class StockasbiDataDto {
    private StockAsBiOutput1 output1;
    //private StockAsBiOutput2 output2;

    @Getter
    @Setter
    @NoArgsConstructor
    public class StockAsBiOutput1 {

        // 호가 접수 시간
        private String aspr_acpt_hour;

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

//    @Getter
//    @Setter
//    @NoArgsConstructor
//    public class StockAsBiOutput2 {
//
//        //주식 현재가
//        private String stck_prpr;
//        //주식 시가
//        private String stck_oprc;
//        //주식 최고가
//        private String stck_hgpr;
//        //주식 최저가
//        private String stck_lwpr;
//        //주식 기준가
//        private String stck_sdpr;
//    }

}
