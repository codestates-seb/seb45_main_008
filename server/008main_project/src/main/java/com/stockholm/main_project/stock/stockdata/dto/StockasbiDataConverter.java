package com.stockholm.main_project.stock.stockdata.dto;

import java.util.Map;

public class StockasbiDataConverter {
    public StockasbiDataDto convertToStockasbiDataDto(Map<String, Object> apiResponse) {
        StockasbiDataDto dto = new StockasbiDataDto();

        Map<String, Object> output1 = (Map<String, Object>) apiResponse.get("output1");
        Map<String, Object> output2 = (Map<String, Object>) apiResponse.get("output2");

        dto.setAskp1((String) output1.get("askp1"));
        dto.setAskp2((String) output1.get("askp2"));
        dto.setAskp3((String) output1.get("askp3"));
        dto.setAskp4((String) output1.get("askp4"));
        dto.setAskp5((String) output1.get("askp5"));

        dto.setBidp1((String) output1.get("bidp1"));
        dto.setBidp2((String) output1.get("bidp2"));
        dto.setBidp3((String) output1.get("bidp3"));
        dto.setBidp4((String) output1.get("bidp4"));
        dto.setBidp5((String) output1.get("bidp5"));


        dto.setAskp_rsqn1((String) output1.get("askp_rsqn1"));
        dto.setAskp_rsqn2((String) output1.get("askp_rsqn2"));
        dto.setAskp_rsqn3((String) output1.get("askp_rsqn3"));
        dto.setAskp_rsqn4((String) output1.get("askp_rsqn4"));
        dto.setAskp_rsqn5((String) output1.get("askp_rsqn5"));

        dto.setBidp_rsqn1((String) output1.get("bidp_rsqn1"));
        dto.setBidp_rsqn2((String) output1.get("bidp_rsqn2"));
        dto.setBidp_rsqn3((String) output1.get("bidp_rsqn3"));
        dto.setBidp_rsqn4((String) output1.get("bidp_rsqn4"));
        dto.setBidp_rsqn5((String) output1.get("bidp_rsqn5"));


        dto.setStck_prpr((String) output2.get("stck_prpr"));
        dto.setStck_oprc((String) output2.get("stck_oprc"));
        dto.setStck_hgpr((String) output2.get("stck_hgpr"));
        dto.setStck_lwpr((String) output2.get("stck_lwpr"));
        dto.setStck_sdpr((String) output2.get("stck_sdpr"));

        return dto;
    }
}
