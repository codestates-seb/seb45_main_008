package com.stockholm.main_project.stock.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyResponseDto {
    @Schema(description = "회사 Id", defaultValue = "데이터 베이스 Id")
    private long companyId;
    @Schema(description = "회사의 고유 주식 코드", defaultValue = "6자리로 이루어진 회사의 고유 주식 코드 (ex. 005930)")
    private String code;
    @Schema(description = "회사 한글 이름", defaultValue = "회사 한글 이름 (ex. 삼성전자)")
    private String korName;
    @Schema(description = "주식 매수/매도 호가 가격, 수량", defaultValue = "as = 매도 호가, bi = 매수 호가")
    private StockAsBiResponseDto stockAsBiResponseDto;
    @Schema(description = "주식 정보", defaultValue = "prpr = 주식 현재가, vrss = 전일 대비 상승, 하락률, ctcr = 누적 거래량, vol = 누적 거래량, pbmn = 누적 거래 대금")
    private StockInfResponseDto stockInfResponseDto;
}

