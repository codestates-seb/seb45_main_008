package com.stockholm.main_project.stock.controller;

import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.stock.dto.StockOrderResponseDto;
import com.stockholm.main_project.stock.entity.StockOrder;
import com.stockholm.main_project.stock.mapper.StockMapper;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("long-polling")
public class LongPollingController {
    private List<StockOrder> updateBuyStockOrders;
    private List<StockOrder> updateSellStockOrders;
    private final StockMapper stockMapper;

    public LongPollingController(StockMapper stockMapper) {
        this.stockMapper = stockMapper;
    }

    @Operation(summary = "예약된 매수, 매도가 완료되면 StockOrder를 반환한다", description = "완료된 StockOrder를 반환한다", tags = { "Stock" })
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK",
                    content = @Content(schema = @Schema(implementation = StockOrderResponseDto.class))),
            @ApiResponse(responseCode = "400", description = "BAD REQUEST"),
            @ApiResponse(responseCode = "404", description = "NOT FOUND"),
            @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    })
    @GetMapping("/listen")
    public ResponseEntity listenForUpdate(@AuthenticationPrincipal Member member) throws InterruptedException {
        updateBuyStockOrders = new ArrayList<>();
        updateSellStockOrders = new ArrayList<>();

        waitForStockOrdersToUpdate();

        List<StockOrder> memberBuyStockOrder = updateBuyStockOrders.stream()
                .filter(stockOrder -> stockOrder.getMember().getMemberId() == member.getMemberId())
                .collect(Collectors.toList());

        List<StockOrder> memberSellStockOrder = updateSellStockOrders.stream()
                .filter(stockOrder -> stockOrder.getMember().getMemberId() == member.getMemberId())
                .collect(Collectors.toList());

        List<StockOrderResponseDto> buyStockOrderResponseDtos = stockMapper.stockOrdersToStockOrderResponseDtos(memberBuyStockOrder);
        List<StockOrderResponseDto> sellStockOrderResponseDtos = stockMapper.stockOrdersToStockOrderResponseDtos(memberSellStockOrder);

        List<List<StockOrderResponseDto>> updateStockOrders = new ArrayList<>();
        updateStockOrders.add(buyStockOrderResponseDtos);
        updateStockOrders.add(sellStockOrderResponseDtos);

        return new ResponseEntity(updateStockOrders, HttpStatus.OK);
    }

    private void waitForStockOrdersToUpdate() throws InterruptedException {
        // 변경된 데이터가 도착할 때까지 대기
        synchronized (this) {
            if (updateBuyStockOrders.isEmpty() && updateSellStockOrders.isEmpty()) {
                wait();
            }
        }
    }

    public synchronized void notifyDataUpdated(List<StockOrder> buyStockOrders,
                                               List<StockOrder> sellStockOrders) {
        updateBuyStockOrders = buyStockOrders;
        updateSellStockOrders = sellStockOrders;
        notify(); // 대기 중인 스레드를 깨워 응답을 보냄
    }
}
