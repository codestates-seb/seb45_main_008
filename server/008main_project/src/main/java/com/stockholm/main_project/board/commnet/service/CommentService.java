package com.stockholm.main_project.board.commnet.service;

import com.stockholm.main_project.board.commnet.dto.CommentRequestDto;
import com.stockholm.main_project.board.commnet.entity.Comment;
import com.stockholm.main_project.board.commnet.repository.CommentRepository;
import com.stockholm.main_project.board.entity.Board;
import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import com.stockholm.main_project.member.entity.Member;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment){
        return commentRepository.save(comment);
    }

    public Comment updateComment(long commentId ,Comment comment, Member member){
        Comment existingComment = findComment(commentId);

        existingComment.setContent(comment.getContent());

        return commentRepository.save(existingComment);

    }

    public List<Comment> findComments(long commentId) {
        return commentRepository.findAllByBoardBoardId(commentId);
    }

    public void deleteComment (long commentId) {
        Comment comment = findComment(commentId);

        commentRepository.delete(comment);
    }

    public Comment findComment(long commentId) {
        return findVerifiedComment(commentId);
    }

    public Comment findVerifiedComment(long commentId) {
        Optional<Comment> optionalComment = commentRepository.findByCommentId(commentId);
        return optionalComment.orElseThrow(() -> new BusinessLogicException(ExceptionCode.COMMENT_NOT_FOUND));
    }

}
