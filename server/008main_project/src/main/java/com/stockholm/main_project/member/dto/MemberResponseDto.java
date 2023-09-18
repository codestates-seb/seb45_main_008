package com.stockholm.main_project.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MemberResponseDto {
    @Schema(description = "MemberId", defaultValue = "1")
    public long memberId;
    @Schema(description = "Email", defaultValue = "Test@example.com")
    public String email;
    @Schema(description = "이름", defaultValue = "TestName")
    private String name;
    @Schema(description = "CashID", defaultValue = "1")
    private String cash;
    @Schema(description = "생성 시간", defaultValue = "LocalDateTime")
    private LocalDateTime createdAt;
}
