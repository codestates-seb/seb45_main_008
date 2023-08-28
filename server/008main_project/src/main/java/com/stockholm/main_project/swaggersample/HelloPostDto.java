package com.stockholm.main_project.swaggersample;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class HelloPostDto {
    @Schema(description = "내용", defaultValue = "hello")
    private String text;
}
