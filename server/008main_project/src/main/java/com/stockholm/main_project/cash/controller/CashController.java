package com.stockholm.main_project.cash.controller;

import com.stockholm.main_project.cash.dto.CashPatchDto;
import com.stockholm.main_project.cash.dto.CashPostDto;
import com.stockholm.main_project.cash.dto.CashResponseDto;
import com.stockholm.main_project.cash.entity.Cash;
import com.stockholm.main_project.cash.mapper.CashMapper;
import com.stockholm.main_project.cash.service.CashService;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.service.MemberService;
import com.stockholm.main_project.stock.service.StockHoldService;
import com.stockholm.main_project.stock.service.StockOrderService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/cash")
public class CashController {

    private final CashMapper mapper;
    private final CashService cashService;
    private final MemberService memberService;
    private final StockHoldService stockHoldService;
    private final StockOrderService stockOrderService;

    public CashController(CashMapper mapper, CashService cashService, MemberService memberService, StockHoldService stockHoldService, StockOrderService stockOrderService) {
        this.mapper = mapper;
        this.cashService = cashService;
        this.memberService = memberService;
        this.stockHoldService = stockHoldService;
        this.stockOrderService = stockOrderService;
    }
    @PostMapping
    @Operation(summary = "현금 정보 생성", description = "새로운 현금 정보를 생성합니다.", tags = { "Cash" })
    @ApiResponse(responseCode = "201", description = "CREATED",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CashResponseDto.class)))
    @ApiResponse(responseCode = "400", description = "이미 보유한 현금이 있습니다.")
    @ApiResponse(responseCode = "401", description = "NOT ENOUGH MONEY")
    public ResponseEntity postCash(@Schema(implementation = CashPostDto.class)@Valid @RequestBody CashPostDto cashPostDto,
                                   @Parameter(hidden = true) @AuthenticationPrincipal Member member){

        Cash cashToCreate = mapper.cashPostToCash(cashPostDto);

        cashToCreate.setMember(member);

        Cash createdCash = cashService.createCash(cashToCreate);
        CashResponseDto responseDto = mapper.cashToCashResponseDto(createdCash);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PatchMapping("{cashId}")
    @Operation(summary = "현금 정보 업데이트", description = "현금 정보를 업데이트합니다.", tags = { "Cash" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CashResponseDto.class)))
    @ApiResponse(responseCode = "401", description = "INVALID CASH")
    public ResponseEntity patchCash(@Schema(implementation = CashPatchDto.class)@PathVariable long cashId, @Valid @RequestBody CashPatchDto requestBody,
                                    @Parameter(hidden = true) @AuthenticationPrincipal Member member){

        Cash cashToUpdate = mapper.cashPatchToCash(requestBody);

        cashToUpdate.setMember(member);

        requestBody.setCashId(cashId);

        Cash cash = cashService.updateCash(cashId, member, requestBody);
        stockHoldService.deleteStockHolds(member.getMemberId());
        stockOrderService.deleteStockOrders(member);

        return new ResponseEntity<>(mapper.cashToCashResponseDto(cash), HttpStatus.OK);
    }

    @Operation(summary = "현금 정보 조회", description = "현금 정보를 조회합니다.", tags = { "Cash" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(mediaType = "application/json", schema = @Schema(implementation = CashResponseDto.class)))
    @ApiResponse(responseCode = "401", description = "INVALID CASH")
    @GetMapping
    private ResponseEntity getCash(@Parameter(hidden = true) @AuthenticationPrincipal Member member){
        Cash response = cashService.findCash(member);

        return new ResponseEntity<>(mapper.cashToCashResponseDto(response), HttpStatus.OK);
    }
}
