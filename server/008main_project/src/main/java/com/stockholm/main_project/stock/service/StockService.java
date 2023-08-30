package com.stockholm.main_project.stock.service;


//import com.stockholm.main_project.stock.stockdata.dto.StockasbiDataConverter;
import com.stockholm.main_project.stock.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.dto.StockMinDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.repository.CompanyRepository;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;


@Service
@Slf4j
public class StockService {
    @Getter
    @Value("${token.app-key}")
    private String APP_KEY;

    @Getter
    @Value("${token.app-secret}")
    private String APP_SECRET;

    @Getter
    @Value("${stock-url.token}")
    private String TOKEN_URL;

    @Getter
    @Value("${stock-url.stockasbi}")
    private String STOCKASBI_URL;

    @Getter
    @Value("${stock-url.stockhour}")
    private String STOCKHOUR_URL;


     private final String FID_ETC_CLS_CODE = "";
    private final String FID_COND_MRKT_DIV_CODE = "J";
    private final String FID_INPUT_HOUR_1 = "153000";
    private final String FID_PW_DATA_INCU_YN = "Y";

    private RestTemplate restTemplate = new RestTemplate();

    public StockService(TokenService tokenService, CompanyRepository companyRepository) {
        this.tokenService = tokenService;
        this.companyRepository = companyRepository;
    }

    private final TokenService tokenService;

    private final CompanyRepository companyRepository;

    public StockasbiDataDto getStockasbiData(String stockCode){
        String token = tokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "FHKST01010200");

        String uri = STOCKASBI_URL + "?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=" + stockCode;

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        ResponseEntity<StockasbiDataDto> response = restTemplate.exchange(uri, HttpMethod.GET, entity, new ParameterizedTypeReference<StockasbiDataDto>() {});

        if (response.getStatusCode().is2xxSuccessful()) {
            StockasbiDataDto stockasbiDataDto = response.getBody();
            return stockasbiDataDto;
            // 응답 바디를 MyResponseClass 객체로 매핑하여 처리
        } else {
            log.info("error");
            return null;
        }

        }

//    public List<StockMinDto> getStockMinData() {
//        List<StockMinDto> stockDatas = new ArrayList<>();
//        for (String stockCode : DEFAULT_STOCK_CODES) {
//            String token = tokenService.getAccessToken();
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.add("Authorization", "Bearer " + token);
//            headers.add("appkey", APP_KEY);
//            headers.add("appsecret", APP_SECRET);
//            headers.add("tr_id", "FHKST03010200");
//
//            String uri = STOCKHOUR_URL + "?FID_COND_MRKT_DIV_CODE=" + FID_COND_MRKT_DIV_CODE + "&FID_INPUT_ISCD=" + stockCode +  "&FID_ETC_CLS_CODE=" + FID_ETC_CLS_CODE
//                    + "&FID_INPUT_HOUR_1=" + FID_INPUT_HOUR_1 + "&FID_PW_DATA_INCU_YN=" +  FID_PW_DATA_INCU_YN;
//
//            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
//
//            ResponseEntity<StockMinDto> response = restTemplate.exchange(uri, HttpMethod.GET, entity, new ParameterizedTypeReference<StockMinDto>() {});
//
//            if (response.getStatusCode().is2xxSuccessful()) {
//                StockMinDto stockMinDto = response.getBody();
//                stockDatas.add(stockMinDto);
//                // 응답 바디를 MyResponseClass 객체로 매핑하여 처리
//            } else {
//                log.info("error");
//            }
//        }
//        return stockDatas;
//    }

    // 모든 회사 리턴
    public List<Company> getCompanies() {
        List<Company> companies = companyRepository.findAll();

        return companies;
    }
}
