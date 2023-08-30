package com.stockholm.main_project.stock.stockdata.service;


//import com.stockholm.main_project.stock.stockdata.dto.StockasbiDataConverter;
import com.stockholm.main_project.stock.stockdata.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.stockdata.dto.StockMinDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;


@Service
@Slf4j
public class StockService {
    //private final StockasbiDataConverter converter = new StockasbiDataConverter();
    private final String APP_KEY = "PSjMh9iyz0EFvbpWkvuYHfLiFuHyNAtLoG9h";
    private final String APP_SECRET = "vtzv7bG78qgtThPEujr1MWDJHKTawSoEDRfAJzB/lYvwj67HdzUsyUavVGD4kORIeGS5q6BJBwoICXy97h8d3RaSAvhK03Yu/seFm0t+22ZQBv4GKhxvU5jGwdMrsucyKuQ0EtXfkJxJoLFsqIO1UA1n3r4HX0D5RxIe8I8efwEYVbidAn4=";
    private final String TOKEN_URL = "https://openapi.koreainvestment.com:9443/oauth2/tokenP";
    private final String STOCKASBI_URL = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    private final String STOCKHOUR_URL = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice";

    private final String FID_ETC_CLS_CODE = "";

    private final String FID_COND_MRKT_DIV_CODE = "J";

    private final String FID_INPUT_HOUR_1 = "153000";

    private final String FID_PW_DATA_INCU_YN = "Y";

    private final List<String> DEFAULT_STOCK_CODES = Arrays.asList(
            "005930", "373220"//, "000660", "207940", "005490",
            //"005935"//, "006400"//, "051910", "005380", "003670"
//            "035420", "000270", "012330", "035720", "068270"
    );

    private RestTemplate restTemplate = new RestTemplate();

    public String getAccessToken() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        Map<String, String> body = new HashMap<>();
        body.put("grant_type", "client_credentials");
        body.put("appkey", APP_KEY);
        body.put("appsecret", APP_SECRET);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(TOKEN_URL, request, Map.class);

        return response.getBody().get("access_token").toString();
    }

    public List<StockasbiDataDto> getStockasbiData(){
        List<StockasbiDataDto> stockDatas = new ArrayList<>();
        for (String stockCode : DEFAULT_STOCK_CODES) {
            String token = getAccessToken();

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
                stockDatas.add(stockasbiDataDto);
                // 응답 바디를 MyResponseClass 객체로 매핑하여 처리
            } else {
                log.info("error");
            }



        }
        return stockDatas;
    }
    public List<StockMinDto> getStockMinData() {
        List<StockMinDto> stockDatas = new ArrayList<>();
        for (String stockCode : DEFAULT_STOCK_CODES) {
            String token = getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "FHKST03010200");

            String uri = STOCKHOUR_URL + "?FID_COND_MRKT_DIV_CODE=" + FID_COND_MRKT_DIV_CODE + "&FID_INPUT_ISCD=" + stockCode +  "&FID_ETC_CLS_CODE=" + FID_ETC_CLS_CODE
                    + "&FID_INPUT_HOUR_1=" + FID_INPUT_HOUR_1 + "&FID_PW_DATA_INCU_YN=" +  FID_PW_DATA_INCU_YN;

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<StockMinDto> response = restTemplate.exchange(uri, HttpMethod.GET, entity, new ParameterizedTypeReference<StockMinDto>() {});

            if (response.getStatusCode().is2xxSuccessful()) {
                StockMinDto stockMinDto = response.getBody();
                stockDatas.add(stockMinDto);
                // 응답 바디를 MyResponseClass 객체로 매핑하여 처리
            } else {
                log.info("error");
            }
        }
        return stockDatas;
    }
}
