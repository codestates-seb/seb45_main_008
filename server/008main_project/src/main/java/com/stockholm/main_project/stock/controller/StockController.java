package com.stockholm.main_project.stock.controller;


import com.stockholm.main_project.stock.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.service.ApiCallService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StockController {

    private final ApiCallService apiCallService;

    public StockController(ApiCallService apiCallService) {
        this.apiCallService = apiCallService;
    }

    @GetMapping("/stockasbi")
    public ResponseEntity getStockasbiData() {
        StockasbiDataDto stockDatas = apiCallService.getStockasbiDataFromApi("005930");
        return ResponseEntity.ok(stockDatas);
    }

    @GetMapping("/kospi")
    public ResponseEntity getKospiMonth() {
        String kospi = apiCallService.getKospiMonthFromApi();
        return ResponseEntity.ok(kospi);
    }


}

