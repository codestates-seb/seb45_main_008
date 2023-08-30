package com.stockholm.main_project.stock.repository;

import com.stockholm.main_project.stock.entity.Star;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StarRepository extends JpaRepository<Star, Long> {
}
