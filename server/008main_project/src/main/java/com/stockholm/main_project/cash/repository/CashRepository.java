package com.stockholm.main_project.cash.repository;

import com.stockholm.main_project.cash.entity.Cash;
import com.stockholm.main_project.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CashRepository extends JpaRepository<Cash, Long> {


    List<Cash> findByMemberAndMoney(Member member, long money);
}
