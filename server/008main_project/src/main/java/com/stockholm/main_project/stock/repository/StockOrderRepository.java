package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.StockOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockOrderRepository extends JpaRepository<StockOrder, Long> {
    // MEMBER_ID로 주식 주문을 모두 삭제하는 JPQL 쿼리
//    @Modifying
//    @Query("DELETE FROM StockOrder so WHERE so.memberId = :memberId")
//    void deleteAllByMemberId(@Param("memberId") Long memberId);
}
