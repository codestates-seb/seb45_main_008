package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.StockOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockOrderRepository extends JpaRepository<StockOrder, Long> {
    List<StockOrder> findAllByCompanyCompanyIdAndOrderStates(long company_companyId, StockOrder.OrderStates orderStates);


}
