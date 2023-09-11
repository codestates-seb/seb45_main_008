package com.stockholm.main_project.stock.dto;

import com.stockholm.main_project.stock.entity.StockOrder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StockOrderResponseDto {
    private long stockOrderId;

    private int stockCount;

    private long memberId;

    private long companyId;

    private StockOrder.OrderTypes OrderTypes;

    private com.stockholm.main_project.stock.entity.StockOrder.OrderStates OrderStates;

    private long price;
}
