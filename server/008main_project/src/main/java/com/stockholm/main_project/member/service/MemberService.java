package com.stockholm.main_project.member.service;

import com.stockholm.main_project.auth.utils.CustomAuthorityUtils;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
}

