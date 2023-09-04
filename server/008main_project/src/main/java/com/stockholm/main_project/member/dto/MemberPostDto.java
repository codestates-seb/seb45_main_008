package com.stockholm.main_project.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.*;

@Getter
@Setter
public class MemberPostDto {
    @Email
    @NotBlank
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$",
            message = "올바른 이메일 구성이 아닙니다.")
    @Schema(description = "Email", defaultValue = "Test@example.com")
    private String email;

    @NotBlank
    @Schema(description = "이름", defaultValue = "TestName")
    private String name;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "1자 이상의 문자, 1개 이상의 숫자, 1개 이상의 특수문자를 포함하고 8자리 이상이어야 합니다.")
    @NotBlank
    @Schema(description = "비밀번호", defaultValue = "test123!@#")
    private String password;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "1자 이상의 문자, 1개 이상의 숫자, 1개 이상의 특수문자를 포함하고 8자리 이상이어야 합니다.")
    @NotBlank
    @Schema(description = "비밀번호 확인", defaultValue = "test123!@#")
    private String confirmPassword;


}
