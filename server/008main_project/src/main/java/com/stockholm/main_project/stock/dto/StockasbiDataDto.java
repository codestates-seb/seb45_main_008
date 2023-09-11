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
        private String askp6;
        private String askp7;
        private String askp8;
        private String askp9;
        private String askp10;

        //매도 잔량
        private String askp_rsqn1;
        private String askp_rsqn2;
        private String askp_rsqn3;
        private String askp_rsqn4;
        private String askp_rsqn5;
        private String askp_rsqn6;
        private String askp_rsqn7;
        private String askp_rsqn8;
        private String askp_rsqn9;
        private String askp_rsqn10;

        //매수 호가
        private String bidp1;
        private String bidp2;
        private String bidp3;
        private String bidp4;
        private String bidp5;
        private String bidp6;
        private String bidp7;
        private String bidp8;
        private String bidp9;
        private String bidp10;

        //매수 잔량
        private String bidp_rsqn1;
        private String bidp_rsqn2;
        private String bidp_rsqn3;
        private String bidp_rsqn4;
        private String bidp_rsqn5;
        private String bidp_rsqn6;
        private String bidp_rsqn7;
        private String bidp_rsqn8;
        private String bidp_rsqn9;
        private String bidp_rsqn10;

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
