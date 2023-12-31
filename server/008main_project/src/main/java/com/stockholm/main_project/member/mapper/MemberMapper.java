package com.stockholm.main_project.member.mapper;

import com.stockholm.main_project.member.dto.MemberPatchDto;
import com.stockholm.main_project.member.dto.MemberPostDto;
import com.stockholm.main_project.member.dto.MemberResponseDto;
import com.stockholm.main_project.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {


    Member memberPostToMember(MemberPostDto requestBody);
    Member memberPatchToMember(MemberPatchDto requestBody);

    @Mapping(source = "cash.cashId", target = "cash")
    MemberResponseDto memberToMemberResponseDto(Member member);
}

