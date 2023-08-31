package com.stockholm.main_project.stock.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class StockMinDto {
    private StockMinOutput1 output1;
    private List<StockMinOutput2> output2;
}
