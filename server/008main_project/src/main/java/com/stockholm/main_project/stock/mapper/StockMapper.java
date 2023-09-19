package com.stockholm.main_project.stock.mapper;

import com.stockholm.main_project.stock.dto.*;
import com.stockholm.main_project.stock.entity.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface StockMapper {
    default List<CompanyResponseDto> CompaniesToCompanyResponseDtos(List<Company> companyList) {

        List<CompanyResponseDto> companyResponseDtoList = new ArrayList<>();

        for(Company company : companyList) {
            CompanyResponseDto companyResponseDto = companyToCompanyResponseDto(company);
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
    default List<StockOrderResponseDto> stockOrdersToStockOrderResponseDtos(List<StockOrder> stockOrders) {
        List<StockOrderResponseDto> stockOrderResponseDtos = new ArrayList<>();

        for(StockOrder stockOrder : stockOrders) {
            StockOrderResponseDto stockOrderResponseDto = stockOrderToStockOrderResponseDto(stockOrder);
            stockOrderResponseDtos.add(stockOrderResponseDto);
        }

        return stockOrderResponseDtos;
    }
    default List<StockHoldResponseDto> stockHoldToStockHoldResponseDto(List<StockHold> stockHolds) {
        List<StockHoldResponseDto> stockHoldResponseDtos = new ArrayList<>();

        for(StockHold stockHold : stockHolds) {
            StockHoldResponseDto stockHoldResponseDto = new StockHoldResponseDto();

            stockHoldResponseDto.setStockHoldId(stockHold.getStockHoldId());
            stockHoldResponseDto.setCompanyId(stockHold.getCompany().getCompanyId());
            stockHoldResponseDto.setCompanyKorName(stockHold.getCompany().getKorName());
            stockHoldResponseDto.setMemberId(stockHold.getMember().getMemberId());
            stockHoldResponseDto.setStockCount(stockHold.getStockCount());
            stockHoldResponseDto.setReserveSellStockCount(stockHold.getReserveStockCount());
            stockHoldResponseDto.setTotalPrice(stockHold.getPrice());
            stockHoldResponseDto.setPercentage(0D);
            stockHoldResponseDto.setStockReturn(0);


            stockHoldResponseDtos.add(stockHoldResponseDto);
        }
        return stockHoldResponseDtos;
    }

    default List<StarResponseDto> starsToStarResponseDtos(List<Star> stars) {
        List<StarResponseDto> starResponseDtos = new ArrayList<>();

        for(Star star : stars) {
            StarResponseDto starResponseDto = new StarResponseDto();

            starResponseDto.setStarId(star.getStarId());
            starResponseDto.setMemberId(star.getMember().getMemberId());
            starResponseDto.setCompanyResponseDto(companyToCompanyResponseDto(star.getCompany()));

            starResponseDtos.add(starResponseDto);
        }
        return starResponseDtos;
    }
}
