package com.stockholm.main_project.stock.service;

import com.stockholm.main_project.stock.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.entity.StockAsBi;
import com.stockholm.main_project.stock.mapper.StockMapper;
import com.stockholm.main_project.stock.repository.StockAsBiRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
@Slf4j
public class StockAsBiService {

    private final StockAsBiRepository stockAsBiRepository;
    private final ApiCallService apiCallService;
    private final StockMapper stockMapper;
    private final CompanyService companyService;

    public StockAsBiService(StockAsBiRepository stockAsBiRepository, ApiCallService apiCallService, StockMapper stockMapper, CompanyService companyService) {
        this.stockAsBiRepository = stockAsBiRepository;
        this.apiCallService = apiCallService;
        this.stockMapper = stockMapper;
        this.companyService = companyService;
    }

    public StockAsBi saveStockAsBi(StockAsBi stockAsBi) {
        return stockAsBiRepository.save(stockAsBi);
    }

    public void updateStockAsBi() throws InterruptedException {
        List<Company> companyList = companyService.getCompanies();

        for(int i = 0; i < companyList.size(); i++) {
            // 주식 코드로 회사 불러오기
            Company company = companyService.getCompany(companyList.get(i).getCode());
            // api 호출하기
            StockasbiDataDto stockasbiDataDto = apiCallService.getStockasbiDataFromApi(company.getCode());
            // mapper로 정리 된 값 받기
            StockAsBi stockAsBi = stockMapper.stockAsBiOutput1ToStockAsBi(stockasbiDataDto.getOutput1());

            // 회사 등록
            stockAsBi.setCompany(company);
            // 호가 컬럼을 새로운 호가 컬럼으로 변경한다
            StockAsBi oldStockAsBi = company.getStockAsBi();
            stockAsBi.setStockAsBiId(oldStockAsBi.getStockAsBiId());
            company.setStockAsBi(stockAsBi);

            // 저장한다
            companyService.saveCompany(company);

            Thread.sleep(180);
        }
    }


}
