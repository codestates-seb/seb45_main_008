package com.stockholm.main_project.stock.controller;


import com.stockholm.main_project.stock.service.ApiCallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class StockController {

    @Autowired
    private ApiCallService apiCallService;


//    @ResponseBody
//    @GetMapping("/stockasbi")
//    public ResponseEntity getStockasbiData() {
//        List<StockasbiDataDto> stockDatas = stockService.getStockasbiData();
//        return ResponseEntity.ok(stockDatas);
//    }
//    @ResponseBody
//    @GetMapping("/stockmin")
//    public ResponseEntity getStockMinData() {
//        List<StockMinDto> stockDatas = stockService.getStockMinData();
//        return ResponseEntity.ok(stockDatas);
//    }
}

