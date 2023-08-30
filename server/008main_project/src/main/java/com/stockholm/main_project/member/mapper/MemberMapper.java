package com.stockholm.main_project.member.mapper;

import com.stockholm.main_project.member.dto.MemberPatchDto;
import com.stockholm.main_project.member.dto.MemberPostDto;
import com.stockholm.main_project.member.dto.MemberResponseDto;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.repository.MemberRepository;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {

    Member memberPostToMember(MemberPostDto requestBody);

    Member memberPatchToMember(MemberPatchDto requestBody);

    MemberResponseDto memberToMemberResponseDto(Member member);


}
