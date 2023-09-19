package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.Token;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<Token, Long> {
}
