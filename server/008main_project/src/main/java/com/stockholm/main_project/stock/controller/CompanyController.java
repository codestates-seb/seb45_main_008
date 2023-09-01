package com.stockholm.main_project.stock.controller;

import com.stockholm.main_project.stock.dto.CompanyResponseDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.mapper.CompanyMapper;
import com.stockholm.main_project.stock.service.CompanyService;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/companies")
@Valid
public class CompanyController {

    private final CompanyService companyService;
    private final CompanyMapper companyMapper;

    public CompanyController(CompanyService companyService, CompanyMapper companyMapper) {
        this.companyService = companyService;
        this.companyMapper = companyMapper;
    }

    @GetMapping
    public ResponseEntity getCompanyList() {
        List<Company> companyList = companyService.getCompanies();
        List<CompanyResponseDto> result = companyMapper.CompaniesToCompanyResponseDtos(companyList);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

//    @GetMapping("/{companyId}")
//    public ResponseEntity getCompanyStockAsBi(@PathVariable("companyId") Long comanyId) {
//
//    }
}
