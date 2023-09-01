package com.stockholm.main_project.stock.mapper;

import com.stockholm.main_project.stock.dto.StockAsBiResponseDto;
import com.stockholm.main_project.stock.dto.StockInfResponseDto;
import com.stockholm.main_project.stock.dto.StockMinDto;
import com.stockholm.main_project.stock.dto.StockasbiDataDto;
import com.stockholm.main_project.stock.entity.StockAsBi;
import com.stockholm.main_project.stock.entity.StockInf;
import com.stockholm.main_project.stock.entity.StockMin;
import org.hibernate.annotations.Source;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StockMapper {
    StockAsBi stockAsBiOutput1ToStockAsBi(StockasbiDataDto.StockAsBiOutput1 stock);
    StockMin stockMinOutput2ToStockMin(StockMinDto.StockMinOutput2 stock);
    StockInf stockMinOutput1ToStockInf(StockMinDto.StockMinOutput1 stock);


}
