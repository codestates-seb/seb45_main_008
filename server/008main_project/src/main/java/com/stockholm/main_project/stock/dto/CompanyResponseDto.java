package com.stockholm.main_project.stock.dto;

import com.stockholm.main_project.stock.entity.StockAsBi;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
public class CompanyResponseDto {
    private long companyId;

    private String code;

    private String korName;

    private StockAsBiResponseDto stockAsBiResponseDto;

    private StockInfResponseDto stockInfResponseDto;
}
