package com.stockholm.main_project.member.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class MemberPostDto {
    private String email;
    private String name;
    private String password;
}
