package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.StockInf;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StockInfRepository extends JpaRepository<StockInf, Long> {
    @Query("SELECT s FROM StockInf s JOIN FETCH s.company ORDER BY s.stck_prpr DESC ")
    List<StockInf> findAllByOrderByStck_prpr();


}
