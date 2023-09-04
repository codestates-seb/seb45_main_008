package com.stockholm.main_project.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPatchDto {
    private long memberId;
    private String email;
    private String name;

}
