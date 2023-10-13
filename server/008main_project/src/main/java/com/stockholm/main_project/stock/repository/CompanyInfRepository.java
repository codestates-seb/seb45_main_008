package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.CompanyInf;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyInfRepository extends JpaRepository<CompanyInf, Long> {
}
