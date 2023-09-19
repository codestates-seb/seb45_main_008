package com.stockholm.main_project.swaggersample;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class HelloResponse {
    @Schema(description = "아이디", defaultValue = "1")
    private long id;
    @Schema(description = "내용", defaultValue = "hello")
    private String text;
}
