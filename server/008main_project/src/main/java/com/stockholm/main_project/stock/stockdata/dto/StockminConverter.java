package com.stockholm.main_project.stock.stockdata.dto;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class StockminConverter {
    public List<StockminDto> convertToStockminDtos(Map<String, Object> apiResponse) {
        List<StockminDto> dtos = new ArrayList<>();

        Map<String, Object> output1 = (Map<String, Object>) apiResponse.get("output1");
        List<Map<String, Object>> output2List = (List<Map<String, Object>>) apiResponse.get("output2");

        for (Map<String, Object> output2 : output2List) {
            StockminDto dto = new StockminDto();

            dto.setHtsKorIsnm((String) output1.get("hts_kor_isnm"));
            dto.setStckPrdyClpr((String) output1.get("stck_prdy_clpr"));
            dto.setAcmlVol((String) output1.get("acml_vol"));
            dto.setStckPrpr((String) output1.get("stck_prpr"));

            dto.setStckPrpr((String) output2.get("stck_prpr"));
            dto.setStckOprc((String) output2.get("stck_oprc"));
            dto.setStckHgpr((String) output2.get("stck_hgpr"));
            dto.setStckLwpr((String) output2.get("stck_lwpr"));

            dtos.add(dto);
        }
        return dtos;
    }
}
