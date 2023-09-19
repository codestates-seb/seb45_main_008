package com.stockholm.main_project.board.commnet.repository;

import com.stockholm.main_project.board.commnet.entity.Comment;
import com.stockholm.main_project.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByBoardBoardId(long boardId);
    Optional<Comment> findByCommentId(Long commentId);

}
