package com.stockholm.main_project.cash.mapper;

import com.stockholm.main_project.cash.dto.CashPostDto;
import com.stockholm.main_project.cash.dto.CashResponseDto;
import com.stockholm.main_project.cash.entity.Cash;
import com.stockholm.main_project.member.dto.MemberPatchDto;
import com.stockholm.main_project.member.dto.MemberPostDto;
import com.stockholm.main_project.member.dto.MemberResponseDto;
import com.stockholm.main_project.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CashMapper {

    Cash cashPostToCash(CashPostDto requestBody);
    CashResponseDto cashToCashResponseDto(Cash cash);
}
