package com.stockholm.main_project.scheduler;

import com.stockholm.main_project.stock.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.service.StockService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class StockScheduler {
    private StockService stockService;

    public StockScheduler(StockService stockService) {
        this.stockService = stockService;
    }

    //@Scheduled(cron = "5 0 9 * * MON-FRI")
    @Scheduled(fixedRate = 10000000)
    public void firstSchedule() throws InterruptedException {
        List<Company> companyList = stockService.getCompanies();

        for(int i = 0; i < companyList.size(); i++) {
            StockasbiDataDto stockasbiDataDto = stockService.getStockasbiData(companyList.get(i).getCode());



            Thread.sleep(100);
        }
    }

//    @Scheduled(fixedRate = 1000)
//    public void run() {
//        System.out.println("Hi");
//    }
}


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

