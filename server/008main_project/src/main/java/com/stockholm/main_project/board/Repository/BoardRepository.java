package com.stockholm.main_project.board.Repository;

import com.stockholm.main_project.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface BoardRepository extends JpaRepository<Board, Long> {
    // 추가적인 쿼리 메서드를 정의할 수 있음
}
