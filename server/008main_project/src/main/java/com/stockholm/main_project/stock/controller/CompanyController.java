package com.stockholm.main_project.stock.controller;

import com.stockholm.main_project.stock.dto.CompanyResponseDto;
import com.stockholm.main_project.stock.dto.StockMinResponseDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.entity.StockMin;
import com.stockholm.main_project.stock.mapper.CompanyMapper;
import com.stockholm.main_project.stock.service.CompanyService;
import com.stockholm.main_project.stock.service.StockMinService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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
    // swagger 추가
    @Operation(summary = "CompanyList 가져오기", description = "CompanyList를 Get해 옵니다", tags = { "Company" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = CompanyResponseDto.class)))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    // 전체 회사 리스트
    @GetMapping
    public ResponseEntity getCompanyList() {
        List<Company> companyList = companyService.findCompanies();
        List<CompanyResponseDto> companyResponseDtoList = companyMapper.CompaniesToCompanyResponseDtos(companyList);

        return new ResponseEntity<>(companyResponseDtoList, HttpStatus.OK);
    }

    // swagger 추가
    @Operation(summary = "특정 회사의 주식 호가 정보 가져오기", description = "특정 회사의 주식 호가 정보를 Get해 옵니다", tags = { "Stock" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = CompanyResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    // 주식 호가 정보
    @GetMapping("/{companyId}")
    public ResponseEntity getCompanyStockAsBi(@PathVariable("companyId") Long comanyId) {
        Company company = companyService.findCompanyById(comanyId);
        CompanyResponseDto companyResponseDto = companyMapper.companyToCompanyResponseDto(company);

        return new ResponseEntity<>(companyResponseDto, HttpStatus.OK);
    }

    @Operation(summary = "주식 한개 분봉 차트 불러오기", description = "주식 하나의 분봉 420개를 불러옵니다", tags = { "Stock" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(array = @ArraySchema(schema = @Schema(implementation = StockMinResponseDto.class)))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    // 차트 하나 호출
    @GetMapping("/charts/{companyId}")
    public ResponseEntity getCompanyChart(@PathVariable("companyId") long companyId) {
        List<StockMinResponseDto> stockMinList = stockMinService.getRecent420StockMin(companyId);

        return new ResponseEntity(stockMinList, HttpStatus.OK);
    }
}
