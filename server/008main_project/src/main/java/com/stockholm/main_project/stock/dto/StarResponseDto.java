package com.stockholm.main_project.stock.dto;

import com.stockholm.main_project.member.dto.MemberResponseDto;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.stock.entity.Company;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Getter
@Setter
public class StarResponseDto {
    private long starId;

    private long memberId;

    private CompanyResponseDto companyResponseDto;
}
