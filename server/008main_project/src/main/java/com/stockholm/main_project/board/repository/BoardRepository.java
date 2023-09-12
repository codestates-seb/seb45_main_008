package com.stockholm.main_project.board.repository;

import com.stockholm.main_project.board.entity.Board;
import com.stockholm.main_project.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    Optional<Board> findByBoardId(Long boardId);
}