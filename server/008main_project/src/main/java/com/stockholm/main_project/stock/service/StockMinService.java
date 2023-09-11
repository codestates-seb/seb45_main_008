package com.stockholm.main_project.stock.service;

import com.stockholm.main_project.stock.dto.StockMinDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.entity.StockInf;
import com.stockholm.main_project.stock.entity.StockMin;
import com.stockholm.main_project.stock.mapper.StockMapper;
import com.stockholm.main_project.stock.repository.StockMinRepository;
import com.stockholm.main_project.utils.Time;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class StockMinService {

    private final CompanyService companyService;
    private final ApiCallService apiCallService;
    private final StockMapper stockMapper;
    private final StockMinRepository stockMinRepository;

    public StockMinService(CompanyService companyService, ApiCallService apiCallService, StockMapper stockMapper, StockMinRepository stockMinRepository) {
        this.companyService = companyService;
        this.apiCallService = apiCallService;
        this.stockMapper = stockMapper;
        this.stockMinRepository = stockMinRepository;
    }

    public void updateStockMin() throws InterruptedException {
        List<Company> companyList = companyService.findCompanies();
        LocalDateTime now = LocalDateTime.now();
        String strHour = Time.strHour(now);


        for(int i = 0; i < companyList.size(); i++) {
            // 주식 코드로 회사 불러오기
            Company company = companyService.findCompanyByCode(companyList.get(i).getCode());
            // 분봉 api 호출하기
            StockMinDto stockMinDto = apiCallService.getStockMinDataFromApi(company.getCode(), strHour);
            // mapper로 정리 된 값 받기
            List<StockMin> stockMinList = stockMinDto.getOutput2().stream()
                    .map(stockMinOutput2 -> {
                        StockMin stockMin = stockMapper.stockMinOutput2ToStockMin(stockMinOutput2);
                        stockMin.setCompany(company);
                        stockMin.setTradeTime(now);
                        return stockMin;
                    }).collect(Collectors.toList());
            // 빠른 시간 순으로 정렬
            Collections.sort(stockMinList, Comparator.comparing(StockMin::getStockTradeTime));
            // 회사 정보 저장
            StockInf stockInf = stockMapper.stockMinOutput1ToStockInf(stockMinDto.getOutput1());
            stockInf.setCompany(company);
            StockInf oldStockInf = company.getStockInf();
            stockInf.setStockInfId(oldStockInf.getStockInfId());
            company.setStockInf(stockInf);

            // 저장한다
            stockMinRepository.saveAll(stockMinList);
            companyService.saveCompany(company);


            Thread.sleep(180);
        }
    }

    public List<StockMin> getChart(long companyId) {
        List<StockMin> stockMinList = stockMinRepository.findAllByCompanyCompanyId(companyId);

        return stockMinList;
    }


}
