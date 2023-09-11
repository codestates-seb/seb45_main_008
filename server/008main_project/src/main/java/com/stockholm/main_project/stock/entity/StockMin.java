package com.stockholm.main_project.stock.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class StockMin {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long stockMinId;

    @ManyToOne
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

    @Column
    private LocalDateTime stockTradeTime;

    //주식 체결 시간(문자열)
    @Column
    private String stck_cntg_hour;
    //주식 현재가
    @Column
    private String stck_prpr;
    //주식 시가
    @Column
    private String stck_oprc;
    @Column
    //주식 최고가
    private String stck_hgpr;
    @Column
    //주식 최저가
    private String stck_lwpr;
    @Column
    //체결 거래량
    private String cntg_vol;
    public void setTradeTime(LocalDateTime now) {

        // 문자열에서 시, 분, 초 추출
        int hour = Integer.parseInt(this.stck_cntg_hour.substring(0, 2));
        int minute = Integer.parseInt(this.stck_cntg_hour.substring(2, 4));
        int second = Integer.parseInt(this.stck_cntg_hour.substring(4, 6));

        // LocalDateTime 객체 생성
        LocalDateTime customDateTime = LocalDateTime.of(
                now.getYear(),
                now.getMonth(),
                now.getDayOfMonth(),
                hour,
                minute,
                second
        );

        this.stockTradeTime = customDateTime;
    }
}
