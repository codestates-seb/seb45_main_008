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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stockorders")
public class StockOrderController {

    private final StockOrderService stockOrderService;
    private final MemberService memberService;
    private final CompanyMapper companyMapper;
    private final StockHoldService stockHoldService;

    public StockOrderController(StockOrderService stockOrderService, MemberService memberService, CompanyMapper companyMapper, StockHoldService stockHoldService) {
        this.stockOrderService = stockOrderService;
        this.memberService = memberService;
        this.companyMapper = companyMapper;
        this.stockHoldService = stockHoldService;
    }

    // @AuthenticationPrincipal 불러와야 함,
    @PostMapping("/buy")
    public ResponseEntity buyStocks(@RequestParam(name = "companyId") long companyId,
                                    @RequestParam(name = "price") long price,
                                    @RequestParam(name = "stockCount") int stockCount) {
        Member member = memberService.findMember(1L);
        StockOrder stockOrder = stockOrderService.buyStocks(member, companyId, price, stockCount);
        StockOrderResponseDto stockOrderResponseDto = companyMapper.stockOrderToStockOrderResponseDto(stockOrder);

        return new ResponseEntity<>(stockOrderResponseDto, HttpStatus.CREATED);
    }

    // @AuthenticationPrincipal 불러와야 함
    @PostMapping("/sell")
    public ResponseEntity sellStocks(@RequestParam(name = "companyId") long companyId,
                                     @RequestParam(name = "price") long price,
                                     @RequestParam(name = "stockCount") int stockCount) {
        Member member = memberService.findMember(1L);
        StockOrder stockOrder = stockOrderService.sellStocks(member, companyId, price, stockCount);
        StockOrderResponseDto stockOrderResponseDto = companyMapper.stockOrderToStockOrderResponseDto(stockOrder);

        return new ResponseEntity<>(stockOrderResponseDto, HttpStatus.CREATED);
    }

    // 보유 주식 정보들 반환하는 api
    // @AuthenticationPrincipal 불러와야 함
    @GetMapping("/stockholds")
    public ResponseEntity getStockHolds() {
        Member member = memberService.findMember(1L);
        List<StockHold> stockHoldList = stockHoldService.findStockHolds(member.getMemberId());
        List<StockHoldResponseDto> stockHoldResponseDtos = companyMapper.stockHoldToStockHoldResponseDto(stockHoldList);
        stockHoldResponseDtos = stockHoldService.setPercentage(stockHoldResponseDtos);

        return new ResponseEntity<>(stockHoldResponseDtos, HttpStatus.OK);
    }
}
