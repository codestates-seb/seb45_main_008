package com.stockholm.main_project.stock.service;

import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import com.stockholm.main_project.stock.dto.StockInfResponseDto;
import com.stockholm.main_project.stock.mapper.StockMapper;
import com.stockholm.main_project.stock.repository.StockInfRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
public class StockInfService {
    private final StockInfRepository stockInfRepository;
    private final StockMapper stockMapper;

    public StockInfService(StockInfRepository stockInfRepository, StockMapper stockMapper) {
        this.stockInfRepository = stockInfRepository;
        this.stockMapper = stockMapper;
    }

    // 스웨거에 criterion 알려주기
    public List<StockInfResponseDto> stockInfSortByCriterion(String criterion) {

        // 종목명 별
//        if(criterion.equals("kor_Name"))
//            return stockMapper.stockInfsToStockInfResponseDtos(stockInfRepository.findAllByOrderByCompany_Company_KorName());
//        // 현재가 별
//        else if(criterion.equals("stck_Prpr"))
//            return stockMapper.stockInfsToStockInfResponseDtos(stockInfRepository.findAllByOrderByStck_prpr());
//        else if(criterion.equals("prdy_Ctrt"))
//            return stockMapper.stockInfsToStockInfResponseDtos(stockInfRepository.findAllByOrderByPrdy_ctrt());
//        else if(criterion.equals("acml_tr_pbmn"))
//            return stockMapper.stockInfsToStockInfResponseDtos(stockInfRepository.findAllByOrderByAcml_tr_pbmn());
//        else
//            throw  new BusinessLogicException(ExceptionCode.CRITERION_NOT_FOUND);
        return null;
    }
}
