package com.stockholm.main_project.scheduler;

import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.entity.Token;
import com.stockholm.main_project.stock.service.CompanyService;
import com.stockholm.main_project.stock.service.StockAsBiService;
import com.stockholm.main_project.stock.service.StockMinService;
import com.stockholm.main_project.stock.service.TokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;


@Slf4j
@Service
public class StockScheduler {
    private final StockAsBiService stockAsBiService;
    private final StockMinService stockMinService;
    private final CompanyService companyService;
    private final TokenService tokenService;

    public StockScheduler(StockAsBiService stockAsBiService, StockMinService stockMinService, CompanyService companyService, TokenService tokenService) {
        this.stockAsBiService = stockAsBiService;

        this.stockMinService = stockMinService;
        this.companyService = companyService;
        this.tokenService = tokenService;
    }

    @Scheduled(cron = "0 30/30 9-15 * * MON-FRI")
    public void myScheduledStockAsBiMethod() throws InterruptedException {
        // 이 메소드는 매주 월요일부터 금요일까지 9:30부터 15:30까지 30분 간격으로 실행됩니다.
        // 원하는 작업을 여기에 추가하세요.
        LocalDateTime start = LocalDateTime.now();
        stockAsBiService.updateStockAsBi();
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        System.out.println(duration.getSeconds());

    }

    @Scheduled(cron = "0 30/30 9-15 * * MON-FRI")
    public void myScheduledStockMinMethod() throws InterruptedException {
        // 이 메소드는 매주 월요일부터 금요일까지 9:30부터 15:30까지 30분 간격으로 실행됩니다.
        // 원하는 작업을 여기에 추가하세요.
        LocalDateTime start = LocalDateTime.now();
        stockMinService.updateStockMin();
        LocalDateTime end = LocalDateTime.now();
        Duration duration = Duration.between(start, end);
        System.out.println(duration.getSeconds());

    }

//    @Scheduled(fixedRate = 100000000)
//    public void run() throws InterruptedException {
//        companyService.fillCompaines();
//    }

//    @Scheduled(fixedRate = 10000000)
//    public void secondSchedule() throws InterruptedException {
//        LocalDateTime start = LocalDateTime.now();
//        stockAsBiService.updateStockAsBi();
//        stockMinService.updateStockMin();
//        LocalDateTime end = LocalDateTime.now();
//        Duration duration = Duration.between(start, end);
//        System.out.println(duration.getSeconds());
//
//    }


//    @Scheduled(fixedRate = 10000000)
//    public void firstSchedule() throws InterruptedException {
//        LocalDateTime start = LocalDateTime.now();
//        stockAsBiService.updateStockAsBi();
//        LocalDateTime end = LocalDateTime.now();
//        Duration duration = Duration.between(start, end);
//        System.out.println(duration.getSeconds());
//    }

//    @Scheduled(fixedRate = 10000000)
//    public void secondSchedule() throws InterruptedException {
//        LocalDateTime start = LocalDateTime.now();
//        stockMinService.updateStockMin();
//        LocalDateTime end = LocalDateTime.now();
//        Duration duration = Duration.between(start, end);
//        System.out.println(duration.getSeconds());
//    }

}



//    @Scheduled(fixedRate = 10000000)
//    public void secondSchedule() throws InterruptedException {
//        LocalDateTime start = LocalDateTime.now();
//        stockMinService.updateStockMin();
//        LocalDateTime end = LocalDateTime.now();
//        Duration duration = Duration.between(start, end);
//        System.out.println(duration.getSeconds());
//    }

//    @Scheduled(fixedRate = 10000000)
//    public void secondSchedule() throws InterruptedException {
//        LocalDateTime start = LocalDateTime.now();
//        stockAsBiService.updateStockAsBi();
//        stockMinService.updateStockMin();
//        LocalDateTime end = LocalDateTime.now();
//        Duration duration = Duration.between(start, end);
//        System.out.println(duration.getSeconds());
//    }





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

