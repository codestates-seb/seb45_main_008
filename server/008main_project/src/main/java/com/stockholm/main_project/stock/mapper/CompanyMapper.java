package com.stockholm.main_project.stock.mapper;

import com.stockholm.main_project.stock.dto.CompanyResponseDto;
import com.stockholm.main_project.stock.entity.Company;
import org.mapstruct.Mapper;

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
}
