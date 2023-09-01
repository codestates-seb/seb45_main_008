package com.stockholm.main_project.stock.controller;

import com.stockholm.main_project.stock.dto.CompanyResponseDto;
import com.stockholm.main_project.stock.dto.StockMinResponseDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.entity.StockMin;
import com.stockholm.main_project.stock.mapper.CompanyMapper;
import com.stockholm.main_project.stock.service.CompanyService;
import com.stockholm.main_project.stock.service.StockMinService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/companies")
@Valid
@Slf4j
public class CompanyController {

    private final CompanyService companyService;
    private final CompanyMapper companyMapper;
    private StockMinService stockMinService;

    public CompanyController(CompanyService companyService, CompanyMapper companyMapper, StockMinService stockMinService) {
        this.companyService = companyService;
        this.companyMapper = companyMapper;
        this.stockMinService = stockMinService;
    }

    // 전체 회사 리스트
    @GetMapping
    public ResponseEntity getCompanyList() {
        List<Company> companyList = companyService.findCompanies();
        List<CompanyResponseDto> companyResponseDtoList = companyMapper.CompaniesToCompanyResponseDtos(companyList);

        return new ResponseEntity<>(companyResponseDtoList, HttpStatus.OK);
    }

    // 주식 호가 정보
    @GetMapping("/{companyId}")
    public ResponseEntity getCompanyStockAsBi(@PathVariable("companyId") Long comanyId) {
        Company company = companyService.findCompanyById(comanyId);
        CompanyResponseDto companyResponseDto = companyMapper.companyToCompanyResponseDto(company);

        return new ResponseEntity<>(companyResponseDto, HttpStatus.OK);
    }

    // 차트 하나 호출
    @GetMapping("/charts/{companyId}")
    public ResponseEntity getCompanyChart(@PathVariable("companyId") long companyId) {
        List<StockMin> stockMinList = stockMinService.getChart(companyId);

        List<StockMinResponseDto> stockMinResponseDtos = stockMinList.stream()
                .map(stockMin -> companyMapper.stockMinToStockMinResponseDto(stockMin))
                .collect(Collectors.toList());

        return new ResponseEntity(stockMinResponseDtos, HttpStatus.OK);
    }
}
