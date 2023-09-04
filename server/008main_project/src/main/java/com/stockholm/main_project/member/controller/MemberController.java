package com.stockholm.main_project.member.controller;

import com.stockholm.main_project.member.dto.MemberPatchDto;
import com.stockholm.main_project.member.dto.MemberPostDto;
import com.stockholm.main_project.member.dto.MemberResponseDto;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.mapper.MemberMapper;
import com.stockholm.main_project.member.service.MemberService;
import com.stockholm.main_project.swaggersample.HelloResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;
    private final MemberMapper mapper;


    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    @Operation(summary = "회원가입", description = "자체 회원가입 요청이 POST됩니다.", tags = { "Member" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(schema = @Schema(implementation = MemberResponseDto.class)))
    @ApiResponse(responseCode = "400", description = "BAD REQUEST")
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
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
    @ApiResponse(responseCode = "400", description = "BAD REQUEST")
    @ApiResponse(responseCode = "404", description = "NOT FOUND")
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    @PatchMapping("{memberId}")
    private ResponseEntity patchMember(@Schema(implementation = MemberPatchDto.class)@PathVariable long memberId, @RequestBody MemberPatchDto memberPatchDto){
        memberPatchDto.setMemberId(memberId);

        Member response = memberService.updateMember(mapper.memberPatchToMember(memberPatchDto));

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response),
                HttpStatus.OK);
    }

    @Operation(summary = "회원 조회", description = "가입한 계정 중 하나가 GET됩니다.", tags = { "Member" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(schema = @Schema(implementation = MemberResponseDto.class)))
    @ApiResponse(responseCode = "400", description = "BAD REQUEST")
    @ApiResponse(responseCode = "404", description = "NOT FOUND")
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    @GetMapping("{memberId}")
    private ResponseEntity getMember(@PathVariable long memberId){
        Member response = memberService.findMember(memberId);

        return new ResponseEntity<>(mapper.memberToMemberResponseDto(response), HttpStatus.OK);
    }

    @Operation(summary = "회원 삭제", description = "가입한 계정을 DELETE합니다.", tags = { "Member" })
    @ApiResponse(responseCode = "204", description = "NO CONTENT")
    @ApiResponse(responseCode = "404", description = "NOT FOUND")
    @ApiResponse(responseCode = "400", description = "BAD REQUEST")
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    @DeleteMapping("{memberId}")
    private ResponseEntity deleteMember(@PathVariable long memberId){
        memberService.deleteMember(memberId);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}