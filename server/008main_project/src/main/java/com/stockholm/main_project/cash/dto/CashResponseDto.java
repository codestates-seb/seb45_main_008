package com.stockholm.main_project.cash.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CashResponseDto {
    @Schema(description = "CashId", defaultValue = "1")
    private long cashId;
    @Schema(description = "금액", defaultValue = "5000000")
    private long money;
    @Schema(description = "생성 시간", defaultValue = "2023-09-04T12:00:00")
    private LocalDateTime createdAt;
    @Schema(description = "수정 시간", defaultValue = "2023-09-04T12:00:00")
    private LocalDateTime lastModifiedAt;
}
