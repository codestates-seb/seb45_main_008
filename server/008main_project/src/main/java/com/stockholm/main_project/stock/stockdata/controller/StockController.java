package com.stockholm.main_project.stock.stockdata.controller;


import com.stockholm.main_project.stock.stockdata.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.stockdata.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Controller
public class StockController {

    @Autowired
    private StockService stockService;


    @ResponseBody
    @GetMapping("/stockasbi")
    public ResponseEntity<List<StockasbiDataDto>> getStockasbiData() {
        List<StockasbiDataDto> stockDatas = stockService.getStockasbiData();
        return ResponseEntity.ok(stockDatas);
    }
    @ResponseBody
    @GetMapping("/stockhour")
    public ResponseEntity<List<String>> getStockhourData() {
        List<String> stockDatas = stockService.getStockhourData();
        return ResponseEntity.ok(stockDatas);
    }
}

