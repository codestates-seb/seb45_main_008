package com.stockholm.main_project.cash.service;

import com.stockholm.main_project.cash.entity.Cash;
import com.stockholm.main_project.cash.repository.CashRepository;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.repository.MemberRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class CashService {

    private final CashRepository cashRepository;


    public CashService(CashRepository cashRepository) {
        this.cashRepository = cashRepository;
    }
    public Cash createCash(Cash cash) {


        Cash saveCash = cashRepository.save(cash);
        System.out.println("# Create Cash");

        return saveCash;
    }
}
