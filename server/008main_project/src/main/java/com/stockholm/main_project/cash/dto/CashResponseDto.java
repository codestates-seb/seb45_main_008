package com.stockholm.main_project.cash.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CashResponseDto {
    @Schema(description = "MoneyId", defaultValue = "1")
    private long moneyId;
    @Schema(description = "금액", defaultValue = "5000000")
    private String money;
    @Schema(description = "생성 시간", defaultValue = "2023-09-04T12:00:00")
    private LocalDateTime createdAt;
}
