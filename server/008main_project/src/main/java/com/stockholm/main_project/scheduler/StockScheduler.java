//package com.stockholm.main_project.scheduler;
//
//import com.stockholm.main_project.stock.stockdata.dto.StockasbiDataDto;
//import com.stockholm.main_project.stock.stockdata.service.StockService;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//
//@Slf4j
//@Service
//public class StockScheduler {
//    private StockService stockService;
//
//    public StockScheduler(StockService stockService) {
//        this.stockService = stockService;
//    }
//
//    @Scheduled(fixedRate = 60000)
//    public void run() {
//        List<StockasbiDataDto> stockasbiDataDtos = stockService.getStockasbiData();
//
//        System.out.println("run1");
//
//        for(StockasbiDataDto stockasbiDataDto : stockasbiDataDtos) {
//            log.info(stockasbiDataDto.getOutput1().getAskp1());
//            log.info(stockasbiDataDto.getOutput1().getAskp2());
//            log.info(stockasbiDataDto.getOutput1().getAskp3());
//            log.info(stockasbiDataDto.getOutput1().getAskp4());
//            log.info(stockasbiDataDto.getOutput1().getAskp5());
//        }
//    }
//
//    @Scheduled(fixedRate = 60000, initialDelay = 1000)
//    public void run2() {
//        List<StockasbiDataDto> stockasbiDataDtos = stockService.getStockasbiData();
//
//        System.out.println("run2");
//
//        for(StockasbiDataDto stockasbiDataDto : stockasbiDataDtos) {
//            log.info(stockasbiDataDto.getOutput1().getAskp1());
//            log.info(stockasbiDataDto.getOutput1().getAskp2());
//            log.info(stockasbiDataDto.getOutput1().getAskp3());
//            log.info(stockasbiDataDto.getOutput1().getAskp4());
//            log.info(stockasbiDataDto.getOutput1().getAskp5());
//        }
//    }
//
//    @Scheduled(fixedRate = 60000, initialDelay = 2000)
//    public void run3() {
//        List<StockasbiDataDto> stockasbiDataDtos = stockService.getStockasbiData();
//
//        System.out.println("run3");
//
//        for(StockasbiDataDto stockasbiDataDto : stockasbiDataDtos) {
//            log.info(stockasbiDataDto.getOutput1().getAskp1());
//            log.info(stockasbiDataDto.getOutput1().getAskp2());
//            log.info(stockasbiDataDto.getOutput1().getAskp3());
//            log.info(stockasbiDataDto.getOutput1().getAskp4());
//            log.info(stockasbiDataDto.getOutput1().getAskp5());
//        }
//    }
//
//    @Scheduled(fixedRate = 60000, initialDelay = 3000)
//    public void run4() {
//        List<StockasbiDataDto> stockasbiDataDtos = stockService.getStockasbiData();
//
//        System.out.println("run4");
//
//        for(StockasbiDataDto stockasbiDataDto : stockasbiDataDtos) {
//            log.info(stockasbiDataDto.getOutput1().getAskp1());
//            log.info(stockasbiDataDto.getOutput1().getAskp2());
//            log.info(stockasbiDataDto.getOutput1().getAskp3());
//            log.info(stockasbiDataDto.getOutput1().getAskp4());
//            log.info(stockasbiDataDto.getOutput1().getAskp5());
//        }
//    }
//
//    @Scheduled(fixedRate = 60000, initialDelay = 4000)
//    public void run5() {
//        List<StockasbiDataDto> stockasbiDataDtos = stockService.getStockasbiData();
//
//        System.out.println("run5");
//
//        for(StockasbiDataDto stockasbiDataDto : stockasbiDataDtos) {
//            log.info(stockasbiDataDto.getOutput1().getAskp1());
//            log.info(stockasbiDataDto.getOutput1().getAskp2());
//            log.info(stockasbiDataDto.getOutput1().getAskp3());
//            log.info(stockasbiDataDto.getOutput1().getAskp4());
//            log.info(stockasbiDataDto.getOutput1().getAskp5());
//        }
//    }
//
//    @Scheduled(fixedRate = 60000, initialDelay = 5000)
//    public void run6() {
//        List<StockasbiDataDto> stockasbiDataDtos = stockService.getStockasbiData();
//
//        System.out.println("run6");
//
//        for(StockasbiDataDto stockasbiDataDto : stockasbiDataDtos) {
//            log.info(stockasbiDataDto.getOutput1().getAskp1());
//            log.info(stockasbiDataDto.getOutput1().getAskp2());
//            log.info(stockasbiDataDto.getOutput1().getAskp3());
//            log.info(stockasbiDataDto.getOutput1().getAskp4());
//            log.info(stockasbiDataDto.getOutput1().getAskp5());
//        }
//    }
//
//    @Scheduled(fixedRate = 60000, initialDelay = 6000)
//    public void run7() {
//        List<StockasbiDataDto> stockasbiDataDtos = stockService.getStockasbiData();
//
//        System.out.println("run7");
//
//        for(StockasbiDataDto stockasbiDataDto : stockasbiDataDtos) {
//            log.info(stockasbiDataDto.getOutput1().getAskp1());
//            log.info(stockasbiDataDto.getOutput1().getAskp2());
//            log.info(stockasbiDataDto.getOutput1().getAskp3());
//            log.info(stockasbiDataDto.getOutput1().getAskp4());
//            log.info(stockasbiDataDto.getOutput1().getAskp5());
//        }
//    }
//}
