package com.stockholm.main_project.stock.dto;

import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.stock.entity.Company;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
public class StockHoldResponseDto {
    private long stockHoldId;

    private long memberId;

    private long companyId;

    private String companyKorName;

    private int stockCount;

    private long price;

    private double percentage;
}
