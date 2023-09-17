package com.stockholm.main_project.stock.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockHoldResponseDto {
    private long stockHoldId;

    private long memberId;

    private long companyId;

    private String companyKorName;

    private int stockCount;

    private long totalPrice;

    private double percentage;

    private long stockReturn;

    private long reserveSellStockCount;
}
