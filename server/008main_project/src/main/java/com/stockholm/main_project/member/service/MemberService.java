package com.stockholm.main_project.member.service;

import com.stockholm.main_project.auth.utils.CustomAuthorityUtils;
import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.repository.MemberRepository;
import com.stockholm.main_project.stock.entity.StockOrder;
import com.stockholm.main_project.stock.repository.StockOrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;
    private final StockOrderRepository stockOrderRepository;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder, CustomAuthorityUtils authorityUtils, StockOrderRepository stockOrderRepository) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.authorityUtils = authorityUtils;
        this.stockOrderRepository = stockOrderRepository;
    }

    public Member createMember(Member member) {

        verifyExistsEmail(member.getEmail());

        String password = member.getPassword();
        String confirmPassword = member.getConfirmPassword();

        if (!password.equals(confirmPassword)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_PASSWORD);
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


        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getName())
                .ifPresent(name -> findMember.setName(name));

        return memberRepository.save(findMember);
    }

    public  Member findMember(long memberId) {

        Member findMember = findVerifiedMember(memberId);

        if (findMember.getMemberId() != memberId) {
            throw new BusinessLogicException(ExceptionCode.INVALID_FAILED);
        }

        return findVerifiedMember(findMember.getMemberId());
    }

    public void deleteMember(long memberId) {

        memberRepository.deleteById(memberId);

        List<StockOrder> orders = stockOrderRepository.findByMemberMemberId(memberId);
        stockOrderRepository.deleteAll(orders);
    }

    public Member findVerifiedMember(long memberId) {

        Optional<Member> optionalMember =
                memberRepository.findByMemberId(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        return findMember;
    }

    public void verifyExistsEmail(String email) {
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.EMAIL_DUPLICATION);
    }

    public Member findMemberByEmail(String email) {
        Optional<Member> optionalUser = memberRepository.findByEmail(email);

        return optionalUser.orElse(null);
    }

    public int findMemberIdByEmail(String email) {
        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        if (optionalMember.isPresent()) {
            Member member = optionalMember.get();
            return (int) member.getMemberId();
        } else {

            throw new  BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }
    }

//    public void deleteStockOrdersByMemberId(Long memberId) {
//        stockOrderRepository.deleteAllByMemberId(memberId);
//    }
}