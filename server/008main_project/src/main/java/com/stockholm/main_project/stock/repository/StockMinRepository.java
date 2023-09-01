package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.StockMin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StockMinRepository extends JpaRepository<StockMin, Long> {
    List<StockMin> findAllByCompanyCompanyId(long companyId);
}
