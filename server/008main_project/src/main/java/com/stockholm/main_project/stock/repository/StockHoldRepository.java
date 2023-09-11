package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.StockHold;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockHoldRepository extends JpaRepository<StockHold, Long> {
    StockHold findByCompanyCompanyIdAndMemberMemberId(long memberId, long companyId);
    List<StockHold> findAllByMember_MemberId(long memberId);

}
