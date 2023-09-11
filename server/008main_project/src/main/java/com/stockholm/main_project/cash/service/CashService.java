package com.stockholm.main_project.cash.service;

import com.stockholm.main_project.cash.dto.CashPatchDto;
import com.stockholm.main_project.cash.entity.Cash;
import com.stockholm.main_project.cash.repository.CashRepository;
import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import com.stockholm.main_project.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
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

    public Cash updateCash(long moneyId, Member member, CashPatchDto patchDto){
        Cash cash = findCash(moneyId);

//        validateAuthor(cash, member);
        cash.setMoney(patchDto.getMoney());

        return cashRepository.save(cash);

    }

    public Cash findCash(long moneyId) {
        Optional<Cash> cashOptional = cashRepository.findById(moneyId);
        return cashOptional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.INVALID_CASH));
    }

    private void validateAuthor(Cash cash, Member member) {

        if (!cash.getMember().equals(member)) {
            throw new BusinessLogicException(ExceptionCode.INVALID_CASH);
        }
    }
}
