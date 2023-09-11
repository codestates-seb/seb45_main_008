package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.StockOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockOrderRepository extends JpaRepository<StockOrder, Long> {
    List<StockOrder> findAllByCompanyCompanyIdAndOrderStates(long company_companyId, StockOrder.OrderStates orderStates);
    List<StockOrder> findAllByMember_MemberId(long memberId);


    // MEMBER_ID로 주식 주문을 모두 삭제하는 JPQL 쿼리
//    @Modifying
//    @Query("DELETE FROM StockOrder so WHERE so.memberId = :memberId")
//    void deleteAllByMemberId(@Param("memberId") Long memberId);
}
