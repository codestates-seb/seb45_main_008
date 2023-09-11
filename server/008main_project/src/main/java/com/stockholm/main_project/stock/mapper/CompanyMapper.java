package com.stockholm.main_project.stock.mapper;

import com.stockholm.main_project.stock.dto.*;
import com.stockholm.main_project.stock.entity.*;
import com.stockholm.main_project.stock.service.StockOrderService;
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
    @Mapping(source = "company.companyId", target = "companyId")
    @Mapping(source = "member.memberId", target = "memberId")
    StockOrderResponseDto stockOrderToStockOrderResponseDto(StockOrder stockOrder);
    default List<StockHoldResponseDto> stockHoldToStockHoldResponseDto(List<StockHold> stockHolds) {
        List<StockHoldResponseDto> stockHoldResponseDtos = new ArrayList<>();

        for(StockHold stockHold : stockHolds) {
            StockHoldResponseDto stockHoldResponseDto = new StockHoldResponseDto();

            stockHoldResponseDto.setStockHoldId(stockHold.getStockHoldId());
            stockHoldResponseDto.setCompanyId(stockHold.getCompany().getCompanyId());
            stockHoldResponseDto.setCompanyKorName(stockHold.getCompany().getKorName());
            stockHoldResponseDto.setMemberId(stockHold.getMember().getMemberId());
            stockHoldResponseDto.setStockCount(stockHold.getStockCount());
            stockHoldResponseDto.setPrice(stockHold.getPrice());
            stockHoldResponseDto.setPercentage(0D);

            stockHoldResponseDtos.add(stockHoldResponseDto);
        }
        return stockHoldResponseDtos;
    }
}
