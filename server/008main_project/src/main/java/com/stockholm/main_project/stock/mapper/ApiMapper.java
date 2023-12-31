package com.stockholm.main_project.stock.mapper;

import com.stockholm.main_project.stock.dto.StockMinDto;
import com.stockholm.main_project.stock.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.entity.StockAsBi;
import com.stockholm.main_project.stock.entity.StockInf;
import com.stockholm.main_project.stock.entity.StockMin;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ApiMapper {
    StockAsBi stockAsBiOutput1ToStockAsBi(StockasbiDataDto.StockAsBiOutput1 stock);
    StockMin stockMinOutput2ToStockMin(StockMinDto.StockMinOutput2 stock);
    StockInf stockMinOutput1ToStockInf(StockMinDto.StockMinOutput1 stock);

}
