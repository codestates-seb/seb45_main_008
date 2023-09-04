package com.stockholm.main_project.member.service;

import com.stockholm.main_project.auth.utils.CustomAuthorityUtils;
import com.stockholm.main_project.member.dto.MemberPostDto;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
    }

    public Member createMember(Member member) {

        verifyExistsEmail(member.getEmail());

        String password = member.getPassword();
        String confirmPassword = member.getConfirmPassword();

        if (!password.equals(confirmPassword)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "비밀번호와 비밀번호 재확인이 일치하지 않습니다.");
        }// 암호 재확인 기능

        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);
        Member saveMember = memberRepository.save(member);
        System.out.println("# Create Member in DB");

        return saveMember;
    }

    public Member updateMember(Member member) {
        Optional<Member> optionalMember = memberRepository.findById(member.getMemberId());

        if (optionalMember.isPresent()) {
            Member foundMember = optionalMember.get();

            if (member.getName() != null) {
                foundMember.setName(member.getName());
            }
            memberRepository.save(foundMember);

            return foundMember;
        }

        return null;
    }

    public Member findMember(long memberId) {

        return memberRepository.findById(memberId).orElse(null);
    }

    public void deleteMember(long memberId) {

        memberRepository.deleteById(memberId);
    }

    private void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new RuntimeException("이미 가입된 이메일입니다.");
    }
}

