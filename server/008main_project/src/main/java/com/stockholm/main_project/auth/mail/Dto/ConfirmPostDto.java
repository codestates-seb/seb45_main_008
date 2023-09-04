package com.stockholm.main_project.auth.mail.Dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConfirmPostDto {
    private String email;
    private String code;
}
