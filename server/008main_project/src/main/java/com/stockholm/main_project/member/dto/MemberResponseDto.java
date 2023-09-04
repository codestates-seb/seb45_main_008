package com.stockholm.main_project.member.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberResponseDto {
    public long memberId;
    public String email;
    private String name;
    private LocalDateTime createdAt;
}
