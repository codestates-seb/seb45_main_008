package com.stockholm.main_project.stock.stockdata.service;


import com.stockholm.main_project.stock.stockdata.dto.StockasbiDataConverter;
import com.stockholm.main_project.stock.stockdata.dto.StockasbiDataDto;
import org.springframework.stereotype.Service;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;


@Service
public class StockService {
    private final StockasbiDataConverter converter = new StockasbiDataConverter();
    private final String APP_KEY = "PSjMh9iyz0EFvbpWkvuYHfLiFuHyNAtLoG9h";
    private final String APP_SECRET = "vtzv7bG78qgtThPEujr1MWDJHKTawSoEDRfAJzB/lYvwj67HdzUsyUavVGD4kORIeGS5q6BJBwoICXy97h8d3RaSAvhK03Yu/seFm0t+22ZQBv4GKhxvU5jGwdMrsucyKuQ0EtXfkJxJoLFsqIO1UA1n3r4HX0D5RxIe8I8efwEYVbidAn4=";
    private final String TOKEN_URL = "https://openapi.koreainvestment.com:9443/oauth2/tokenP";
    private final String STOCKASBI_URL = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-asking-price-exp-ccn";
    private final String STOCKHOUR_URL = "https://openapi.koreainvestment.com:9443/uapi/domestic-stock/v1/quotations/inquire-time-itemconclusion";
    private final String START_TIME = "155000";

    private final List<String> DEFAULT_STOCK_CODES = Arrays.asList(
            "005930", "373220", "000660", "207940", "005490"
//            "005935", "006400"
//            "051910"
//            "005380", "003670"
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

    public List<StockasbiDataDto> getStockasbiData() {
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

            ResponseEntity<Map> response = restTemplate.exchange(uri, HttpMethod.GET, entity, Map.class);
            StockasbiDataDto dto = converter.convertToStockasbiDataDto(response.getBody());

            stockDatas.add(dto);
        }
        return stockDatas;
    }
    public List<String> getStockhourData() {
        List<String> stockDatas = new ArrayList<>();
        for (String stockCode : DEFAULT_STOCK_CODES) {
            String token = getAccessToken();

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + token);
            headers.add("appkey", APP_KEY);
            headers.add("appsecret", APP_SECRET);
            headers.add("tr_id", "FHPST01060000");

            String uri = STOCKHOUR_URL
                    + "?FID_COND_MRKT_DIV_CODE=J&FID_INPUT_ISCD=" + stockCode
                    + "&FID_INPUT_HOUR_1=" + START_TIME;

            HttpEntity<String> entity = new HttpEntity<>("parameters", headers);

            ResponseEntity<String> response = restTemplate.exchange(uri, HttpMethod.GET, entity, String.class);

            stockDatas.add(response.getBody());
        }
        return stockDatas;
    }
}
