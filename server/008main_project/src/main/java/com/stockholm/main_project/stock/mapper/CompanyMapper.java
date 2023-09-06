package com.stockholm.main_project.stock.mapper;

import com.stockholm.main_project.stock.dto.CompanyResponseDto;
import com.stockholm.main_project.stock.dto.StockAsBiResponseDto;
import com.stockholm.main_project.stock.dto.StockInfResponseDto;
import com.stockholm.main_project.stock.dto.StockMinResponseDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.entity.StockAsBi;
import com.stockholm.main_project.stock.entity.StockInf;
import com.stockholm.main_project.stock.entity.StockMin;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface CompanyMapper {
    default List<CompanyResponseDto> CompaniesToCompanyResponseDtos(List<Company> companyList) {

        List<CompanyResponseDto> companyResponseDtoList = new ArrayList<>();

        for(Company company : companyList) {
            CompanyResponseDto companyResponseDto = new CompanyResponseDto();

            companyResponseDto.setCompanyId(company.getCompanyId());
            companyResponseDto.setCode(company.getCode());
            companyResponseDto.setKorName(company.getKorName());

            companyResponseDtoList.add(companyResponseDto);
        }
        return companyResponseDtoList;
    }

    default CompanyResponseDto companyToCompanyResponseDto(Company company) {
        CompanyResponseDto companyResponseDto = new CompanyResponseDto();

        companyResponseDto.setCompanyId(company.getCompanyId());
        companyResponseDto.setCode(company.getCode());
        companyResponseDto.setKorName(company.getKorName());
        companyResponseDto.setStockAsBiResponseDto(stockAsBiToStockAsBiResponseDto(company.getStockAsBi()));
        companyResponseDto.setStockInfResponseDto(stockInfToStockInfResponseDto(company.getStockInf()));

        return companyResponseDto;
    };

    @Mapping(source = "company.companyId", target = "companyId")
    StockInfResponseDto stockInfToStockInfResponseDto(StockInf stockInf);
    @Mapping(source = "company.companyId", target = "companyId")
    StockAsBiResponseDto stockAsBiToStockAsBiResponseDto(StockAsBi stockAsBi);
    @Mapping(source = "company.companyId", target = "companyId")
    StockMinResponseDto stockMinToStockMinResponseDto(StockMin stockMin);
}
