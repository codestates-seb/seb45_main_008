package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.StockOrder;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockOrderRepository extends JpaRepository<StockOrder, Long> {
}
