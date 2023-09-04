package com.stockholm.main_project.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPatchDto {
    @Schema(description = "MemberId", defaultValue = "1")
    private long memberId;
    @Schema(description = "Email 변경 불가", defaultValue = "Test@example.com")
    private String email;
    @Schema(description = "변경을 원하는 이름", defaultValue = "TestName12")
    private String name;

}
