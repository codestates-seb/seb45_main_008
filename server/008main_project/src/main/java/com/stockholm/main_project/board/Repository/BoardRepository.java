package com.stockholm.main_project.board.Repository;

import com.stockholm.main_project.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    @Query("SELECT b FROM Board b LEFT JOIN FETCH b.comments WHERE b.id = :boardId")
    Optional<Board> findByIdWithComments(@Param("boardId") Long boardId);


    // 다른 메서드들
}