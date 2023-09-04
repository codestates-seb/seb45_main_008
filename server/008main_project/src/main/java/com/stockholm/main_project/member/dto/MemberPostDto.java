package com.stockholm.main_project.member.dto;

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
    private String email;

    @NotBlank
    private String name;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "1자 이상의 문자, 1개 이상의 숫자, 1개 이상의 특수문자를 포함하고 8자리 이상이어야 합니다.")
    @NotBlank
    private String password;

    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            message = "1자 이상의 문자, 1개 이상의 숫자, 1개 이상의 특수문자를 포함하고 8자리 이상이어야 합니다.")
    @NotBlank
    private String confirmPassword;


}
