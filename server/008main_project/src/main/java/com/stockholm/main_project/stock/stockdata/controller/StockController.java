package com.stockholm.main_project.stock.stockdata.controller;


import com.stockholm.main_project.stock.stockdata.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.stockdata.dto.StockMinDto;
import com.stockholm.main_project.stock.stockdata.service.StockService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class StockController {

    @Autowired
    private StockService stockService;


    @ResponseBody
    @GetMapping("/stockasbi")
    public ResponseEntity getStockasbiData() {
        List<StockasbiDataDto> stockDatas = stockService.getStockasbiData();
        return ResponseEntity.ok(stockDatas);
    }
    @ResponseBody
    @GetMapping("/stockmin")
    public ResponseEntity getStockMinData() {
        List<StockMinDto> stockDatas = stockService.getStockMinData();
        return ResponseEntity.ok(stockDatas);
    }
}

