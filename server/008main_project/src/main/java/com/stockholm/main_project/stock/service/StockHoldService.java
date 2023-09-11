package com.stockholm.main_project.stock.service;

import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import com.stockholm.main_project.member.repository.MemberRepository;
import com.stockholm.main_project.stock.dto.StockHoldResponseDto;
import com.stockholm.main_project.stock.entity.Company;
import com.stockholm.main_project.stock.entity.StockHold;
import com.stockholm.main_project.stock.repository.CompanyRepository;
import com.stockholm.main_project.stock.repository.StockHoldRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@Slf4j
public class StockHoldService {
    private final StockHoldRepository stockHoldRepository;
    private final MemberRepository memberRepository;
    private final CompanyRepository companyRepository;

    public StockHoldService(StockHoldRepository stockHoldRepository, MemberRepository memberRepository, CompanyRepository companyRepository) {
        this.stockHoldRepository = stockHoldRepository;
        this.memberRepository = memberRepository;
        this.companyRepository = companyRepository;
    }

    // 없으면 새로운 스톡 홀드를 생성해서 반환해준다
    public StockHold checkStockHold(long companyId, long memberId) {
        StockHold stockHold = stockHoldRepository.findByCompanyCompanyIdAndMemberMemberId(memberId, companyId);
        if(stockHold == null) {
            StockHold newStockHold = new StockHold();
            newStockHold.setMember(memberRepository.findById(memberId).get());
            newStockHold.setCompany(companyRepository.findById(companyId).get());

            return newStockHold;
        }
        else
            return stockHold;
    }

    // 보유중인 회사 주식 정보 반환
    public StockHold findStockHold(long companyId, long memberId) {
        StockHold stockHold = stockHoldRepository.findByCompanyCompanyIdAndMemberMemberId(companyId, memberId);
        if(stockHold == null)
            throw new BusinessLogicException(ExceptionCode.STOCKHOLD_NOT_FOUND);
        else
            return stockHold;
    }

    public List<StockHold> findStockHolds(long memberId) {
        List<StockHold> stockHoldList = stockHoldRepository.findAllByMember_MemberId(memberId);

        return stockHoldList;
    }

    public List<StockHoldResponseDto> setPercentage(List<StockHoldResponseDto> stockHoldResponseDtos) {
        for(StockHoldResponseDto stockHoldResponseDto : stockHoldResponseDtos) {
            // 이름으로 회사를 불러온다
            Company company = companyRepository.findByCompanyId(stockHoldResponseDto.getCompanyId());
            // 주식 현재가를 불러온다
            String nowPrice = company.getStockInf().getStck_prpr();
            // 주식 수익 = 전체 주식 가치 - 전체 투자 금액
            double totalRevenue = Double.valueOf(nowPrice) * stockHoldResponseDto.getStockCount() - stockHoldResponseDto.getPrice();
            // 주식 수익률(%) = (주식 수익 / 전체 투자 금액) × 100
            double percentage = (totalRevenue / (double)stockHoldResponseDto.getPrice()) * 100;

            stockHoldResponseDto.setPercentage(percentage);
        }
        return stockHoldResponseDtos;
    }

}
