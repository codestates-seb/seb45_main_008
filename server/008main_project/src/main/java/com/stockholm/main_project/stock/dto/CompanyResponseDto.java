package com.stockholm.main_project.stock.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanyResponseDto {
    private long companyId;

    private String code;

    private String korName;

    private StockAsBiResponseDto stockAsBiResponseDto;

    private StockInfResponseDto stockInfResponseDto;
}
