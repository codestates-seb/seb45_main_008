package com.stockholm.main_project.cash.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
public class CashPostDto {

    @Schema(description = "금액", defaultValue = "5000000")
    private String money;
}
