package com.stockholm.main_project.stock.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CompanyInf {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long companyInfId;

    @Column
    // 상장 주수
    private String lstn_stcn;

    @Column
    // 시가 총액
    private String hts_avls;

    @Column
    // 52주 최고가
    private String w52_hgpr;

    @Column
    // 52주 최저가
    private String w52_lwpr;

    @Column
    // 산업군
    private String industry;

    @Column
    // 세부 산업군
    private String detailed_Industry;

    @Column
    // 기업 개요
    private String company_Overview;

    @OneToOne
    @JoinColumn(name = "COMPANY_ID")
    private Company company;

    @Builder
    public CompanyInf(long companyInfId, String lstn_stcn, String hts_avls, String w52_hgpr, String w52_lwpr, String industry, String detailed_Industry, String company_Overview, Company company) {
        this.companyInfId = companyInfId;
        this.lstn_stcn = lstn_stcn;
        this.hts_avls = hts_avls;
        this.w52_hgpr = w52_hgpr;
        this.w52_lwpr = w52_lwpr;
        this.industry = industry;
        this.detailed_Industry = detailed_Industry;
        this.company_Overview = company_Overview;
        this.company = company;
    }

    public CompanyInfBuilder updateCompanyInf() {
        return builder()
                .companyInfId(this.companyInfId)
                .company(this.company)
                .company_Overview(this.company_Overview)
                .industry(this.industry)
                .detailed_Industry(this.detailed_Industry);
    }
}