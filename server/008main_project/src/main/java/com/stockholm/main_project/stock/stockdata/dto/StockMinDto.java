package com.stockholm.main_project.stock.stockdata.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class StockMinDto {
    private StockMinOutput1 output1;
    private StockMinOutput2[] output2;
}
