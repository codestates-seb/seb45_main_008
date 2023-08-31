package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.StockMin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockMinRepository extends JpaRepository<StockMin, Long> {
}
