package com.stockholm.main_project.member.controller;

import com.stockholm.main_project.member.dto.MemberPatchDto;
import com.stockholm.main_project.member.dto.MemberPostDto;
import com.stockholm.main_project.member.dto.MemberResponseDto;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.mapper.MemberMapper;
import com.stockholm.main_project.member.service.MemberService;
import com.stockholm.main_project.swaggersample.HelloResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/members")
@Slf4j
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;


    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @Operation(summary = "회원가입", description = "자체 회원가입 요청이 POST됩니다.", tags = { "Member" })
    @ApiResponse(responseCode = "201", description = "CREATED",
            content = @Content(schema = @Schema(implementation = MemberResponseDto.class)))
    @ApiResponse(responseCode = "400", description = "EMAIL_DUPLICATION")
    @ApiResponse(responseCode = "404", description = "INVALID_PASSWORD")
    @PostMapping
    public ResponseEntity postMember(@Schema(implementation = MemberPostDto.class)@Valid @RequestBody MemberPostDto memberPostDto){
        Member member = mapper.memberPostToMember(memberPostDto);

        Member response = memberService.createMember(member);

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response),
                HttpStatus.CREATED);
    }

    @Operation(summary = "회원 정보 변경", description = "가입한 계정의 이름을 PATCH합니다.", tags = { "Member" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(schema = @Schema(implementation = MemberResponseDto.class)))
    @ApiResponse(responseCode = "404", description = "MEMBER NOT FOUND")
    @PatchMapping
    private ResponseEntity patchMember(@Schema(implementation = MemberPatchDto.class)@Valid @RequestBody MemberPatchDto memberPatchDto,@Parameter(hidden = true) @AuthenticationPrincipal Member member){

        memberPatchDto.setMemberId(member.getMemberId());

        Member patchedMember = new Member();
        patchedMember.setMemberId(memberPatchDto.getMemberId());
        patchedMember.setName(memberPatchDto.getName());
        patchedMember.setEmail(memberPatchDto.getEmail());

        Member response = memberService.updateMember(patchedMember);

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
    }


    @Operation(summary = "회원 조회", description = "가입한 계정 중 하나가 GET됩니다.", tags = { "Member" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(schema = @Schema(implementation = MemberResponseDto.class)))
    @ApiResponse(responseCode = "404", description = "INVALID FAILED")
    @GetMapping
    private ResponseEntity getMember(@Parameter(hidden = true) @AuthenticationPrincipal Member member){
        Member response = memberService.findMember(member.getMemberId());

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
    }

    @Operation(summary = "회원 삭제", description = "가입한 계정을 DELETE합니다.", tags = { "Member" })
    @ApiResponse(responseCode = "204", description = "NO CONTENT")
    @ApiResponse(responseCode = "404", description = "NOT FOUND")
    @ApiResponse(responseCode = "400", description = "BAD REQUEST")
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    @DeleteMapping
    private ResponseEntity deleteMember(@Parameter(hidden = true) @AuthenticationPrincipal Member member){
        memberService.deleteMember(member.getMemberId());

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}