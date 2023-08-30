package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long> {
}
