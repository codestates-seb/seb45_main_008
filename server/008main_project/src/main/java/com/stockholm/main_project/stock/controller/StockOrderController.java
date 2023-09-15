package com.stockholm.main_project.stock.controller;

import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.service.MemberService;
import com.stockholm.main_project.stock.dto.StockHoldResponseDto;
import com.stockholm.main_project.stock.dto.StockOrderResponseDto;
import com.stockholm.main_project.stock.entity.StockHold;
import com.stockholm.main_project.stock.entity.StockOrder;
import com.stockholm.main_project.stock.mapper.CompanyMapper;
import com.stockholm.main_project.stock.service.StockHoldService;
import com.stockholm.main_project.stock.service.StockOrderService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stock")
public class StockOrderController {

    private final StockOrderService stockOrderService;
    private final CompanyMapper companyMapper;
    private final StockHoldService stockHoldService;

    public StockOrderController(StockOrderService stockOrderService, CompanyMapper companyMapper, StockHoldService stockHoldService) {
        this.stockOrderService = stockOrderService;
        this.companyMapper = companyMapper;
        this.stockHoldService = stockHoldService;
    }

    // 매수 api
    @PostMapping("/buy")
    public ResponseEntity buyStocks(@RequestParam(name = "companyId") long companyId,
                                    @RequestParam(name = "price") long price,
                                    @RequestParam(name = "stockCount") int stockCount,
                                    @AuthenticationPrincipal Member member) {
        StockOrder stockOrder = stockOrderService.buyStocks(member, companyId, price, stockCount);
        StockOrderResponseDto stockOrderResponseDto = companyMapper.stockOrderToStockOrderResponseDto(stockOrder);

        return new ResponseEntity<>(stockOrderResponseDto, HttpStatus.CREATED);
    }

    // 매도 api
    @PostMapping("/sell")
    public ResponseEntity sellStocks(@RequestParam(name = "companyId") long companyId,
                                     @RequestParam(name = "price") long price,
                                     @RequestParam(name = "stockCount") int stockCount,
                                     @AuthenticationPrincipal Member member) {
        StockOrder stockOrder = stockOrderService.sellStocks(member, companyId, price, stockCount);
        StockOrderResponseDto stockOrderResponseDto = companyMapper.stockOrderToStockOrderResponseDto(stockOrder);

        return new ResponseEntity<>(stockOrderResponseDto, HttpStatus.CREATED);
    }

    // 보유 주식 정보들 반환하는 api
    @GetMapping("/stockholds")
    public ResponseEntity getStockHolds(@AuthenticationPrincipal Member member) {
        List<StockHoldResponseDto> stockHoldResponseDtos = stockHoldService.findStockHolds(member.getMemberId());
        //vList<StockHoldResponseDto> stockHoldResponseDtos = companyMapper.stockHoldToStockHoldResponseDto(stockHoldList);
        stockHoldResponseDtos = stockHoldService.setPercentage(stockHoldResponseDtos);

        return new ResponseEntity<>(stockHoldResponseDtos, HttpStatus.OK);
    }

    // 멤버의 stockOrder를 반환하는 api
    @GetMapping("/stockorders")
    public ResponseEntity getStockOrders(@AuthenticationPrincipal Member member) {
        List<StockOrderResponseDto> stockOrderResponseDtos = stockOrderService.getMemberStockOrders(member.getMemberId());

        return new ResponseEntity<>(stockOrderResponseDtos, HttpStatus.OK);
    }

    // 미 체결된 매수, 매도 삭제하는 api
    @DeleteMapping("/stockorders")
    public void deleteStockOrders(@AuthenticationPrincipal Member member,
                                  @RequestParam("stockOrderId") long stockOrderId,
                                  @RequestParam("stockCount") int stockCount) {
        stockOrderService.deleteStockOrder(member, stockOrderId, stockCount);
    }
}
