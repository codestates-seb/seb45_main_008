package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.StockMin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockMinRepository extends JpaRepository<StockMin, Long> {
    List<StockMin> findAllByCompanyCompanyId(long companyId);
    @Query(value = "SELECT * FROM stock_min s WHERE s.company_id = ?1 ORDER BY s.stock_min_id DESC LIMIT 420", nativeQuery = true)
    List<StockMin> findTop420ByCompanyIdOrderByStockMinIdDesc(long companyId);
}
