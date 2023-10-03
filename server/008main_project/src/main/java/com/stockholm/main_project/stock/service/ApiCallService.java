package com.stockholm.main_project.stock.service;

import com.stockholm.main_project.stock.dto.CompanyInfDto;
import com.stockholm.main_project.stock.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.dto.StockMinDto;
import com.stockholm.main_project.stock.entity.CompanyInf;
import com.stockholm.main_project.stock.repository.CompanyRepository;
import com.stockholm.main_project.utils.Time;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.time.LocalDateTime;


@Service
@Transactional
@Slf4j
public class ApiCallService {
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

    @Getter
    @Value("${stock-url.kospi}")
    private String KOSPI_URL;

    @Getter
    @Value("${stock-url.companyInf}")
    private String COMPANY_URL;


    private final String FID_ETC_CLS_CODE = "";
    private final String FID_COND_MRKT_DIV_CODE = "J";
    // private final String FID_INPUT_HOUR_1 = "153000";
    private final String FID_PW_DATA_INCU_YN = "Y";

    private RestTemplate restTemplate = new RestTemplate();

    public ApiCallService(TokenService tokenService, CompanyRepository companyRepository) {
        this.tokenService = tokenService;
        this.companyRepository = companyRepository;
    }

    private final TokenService tokenService;

    private final CompanyRepository companyRepository;

    public StockasbiDataDto getStockasbiDataFromApi(String stockCode){
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
        } else {
            log.info("error");
            return null;
        }

    }

    public StockMinDto getStockMinDataFromApi(String stockCode, String strHour) {
        String token = tokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "FHKST03010200");

        String uri = STOCKHOUR_URL + "?FID_COND_MRKT_DIV_CODE=" + FID_COND_MRKT_DIV_CODE + "&FID_INPUT_ISCD=" + stockCode +  "&FID_ETC_CLS_CODE=" + FID_ETC_CLS_CODE
                + "&FID_INPUT_HOUR_1=" + strHour + "&FID_PW_DATA_INCU_YN=" +  FID_PW_DATA_INCU_YN;

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        ResponseEntity<StockMinDto> response = restTemplate.exchange(uri, HttpMethod.GET, entity, new ParameterizedTypeReference<StockMinDto>() {});

        if (response.getStatusCode().is2xxSuccessful()) {
            StockMinDto stockMinDto = response.getBody();
            return stockMinDto;

        } else {
            log.info("error");
            return null;
        }

    }

    public String getKospiMonthFromApi(){
        String token = tokenService.getAccessToken();

        LocalDateTime localDateTime = LocalDateTime.now();

        String strMonth = Time.strMonth(localDateTime);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "FHKUP03500100");

        String uri = KOSPI_URL + "?FID_COND_MRKT_DIV_CODE=U&FID_INPUT_ISCD=" + "0001" + "&FID_INPUT_DATE_1=" + "20230101"
                +"&FID_INPUT_DATE_2=" + strMonth + "&FID_PERIOD_DIV_CODE=" + "M";

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            return response.getBody();
        } else {
            log.info("error");
            return null;
        }

    }

    public CompanyInfDto getCompayInfFromApi(String stockCode){
        String token = tokenService.getAccessToken();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("appkey", APP_KEY);
        headers.add("appsecret", APP_SECRET);
        headers.add("tr_id", "FHKST01010100");

        String uri = COMPANY_URL + "?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=" + stockCode;

        HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

        ResponseEntity<CompanyInfDto> response = restTemplate.exchange(uri, HttpMethod.GET, entity, new ParameterizedTypeReference<CompanyInfDto>() {});

        if (response.getStatusCode().is2xxSuccessful()) {
            CompanyInfDto companyInfDto = response.getBody();
            log.info("실행");
            return companyInfDto;
        } else {
            log.info("error");
            return null;
        }

    }

}
