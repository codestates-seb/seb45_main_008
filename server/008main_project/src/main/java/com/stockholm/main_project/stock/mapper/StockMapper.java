package com.stockholm.main_project.stock.mapper;

import com.stockholm.main_project.stock.dto.StockAsBiOutput1;
import com.stockholm.main_project.stock.dto.StockMinOutput1;
import com.stockholm.main_project.stock.dto.StockMinOutput2;
import com.stockholm.main_project.stock.entity.StockAsBi;
import com.stockholm.main_project.stock.entity.StockMin;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StockMapper {
    StockAsBi stockAsBiOutput1ToStockAsBi(StockAsBiOutput1 stock);
    StockMin stockMinOutput2ToStockMin(StockMinOutput2 stock);
}
