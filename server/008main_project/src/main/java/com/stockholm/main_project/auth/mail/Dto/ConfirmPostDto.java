package com.stockholm.main_project.auth.mail.Dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
public class ConfirmPostDto {
    @Email
    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$",
            message = "올바른 이메일 구성이 아닙니다.")
    @Schema(description = "Email", defaultValue = "Test@example.com")
    private String email;
    @Schema(description = "승인 코드", defaultValue = "4148WEAW1")
    private String code;
}
