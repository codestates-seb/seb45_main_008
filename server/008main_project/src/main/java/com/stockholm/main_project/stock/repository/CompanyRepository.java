package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CompanyRepository extends JpaRepository<Company, Long> {

    @Query("SELECT c FROM Company c JOIN FETCH c.stockAsBi JOIN FETCH c.stockInf WHERE c.code = :code")
    Company findByCode(@Param("code") String code);
    @Query("SELECT c FROM Company c JOIN FETCH c.stockAsBi JOIN FETCH c.stockInf WHERE c.companyId = :companyId")
    Company findByCompanyId(@Param("companyId") long companyId);
    @Query("SELECT c from Company c join fetch c.stockAsBi JOIN FETCH c.stockInf")
    List<Company> findAll();

}
