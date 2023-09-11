package com.stockholm.main_project.comment.Service;

import com.stockholm.main_project.board.Repository.BoardRepository;
import com.stockholm.main_project.board.entity.Board;
import com.stockholm.main_project.comment.Repository.CommentRepository;
import com.stockholm.main_project.comment.dto.CommentDto;
import com.stockholm.main_project.comment.entity.CommentEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final BoardRepository boardRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, BoardRepository boardRepository) {
        this.commentRepository = commentRepository;
        this.boardRepository = boardRepository;
    }

    public CommentDto createComment(String content, Long boardId) {
        CommentEntity comment = new CommentEntity();
        comment.setContent(content);

        // 댓글이 속한 게시판 설정
        Board board = boardRepository.findById(boardId).orElse(null);
        if (board != null) {
            comment.setBoard(board);

            // 댓글 엔티티를 저장하고 반환
            CommentEntity savedComment = commentRepository.save(comment);

            // 게시판 엔티티에 댓글 추가
            List<CommentEntity> comments = board.getComments(); // 기존 댓글 목록 가져오기
            comments.add(savedComment); // 새로운 댓글 추가
            board.setComments(comments); // 게시판에 댓글 목록 설정

            // 게시판 엔티티를 저장
            boardRepository.save(board);

            CommentDto createdCommentDto = new CommentDto();

            // 생성된 댓글의 ID 설정
            createdCommentDto.setId(savedComment.getId());

            // 해당 글의 ID 설정 (게시판 ID)
            createdCommentDto.setPostId(board.getId());

            createdCommentDto.setContent(savedComment.getContent());

            return createdCommentDto;
        } else {
            return null;
        }
    }

    public CommentDto getCommentById(Long id) {
        CommentEntity comment = commentRepository.findById(id).orElse(null);

        if (comment != null) {
            CommentDto commentDto = new CommentDto();

            // 이 부분 추가: 조회된 댓글의 ID 설정
            commentDto.setId(comment.getId());

            // 이 부분 추가: 해당 글의 ID 설정 (게시판 ID)
            commentDto.setId(comment.getBoard().getId());
            commentDto.setContent(comment.getContent());

            return commentDto;
        } else {
            return null;
        }
    }


    public CommentDto partialUpdateComment(Long id, CommentDto updatedCommentDto) {
        CommentEntity existingComment = commentRepository.findById(id).orElse(null);

        if (existingComment != null) {
            // 업데이트할 필드 설정
            if (updatedCommentDto.getContent() != null) {
                existingComment.setContent(updatedCommentDto.getContent());
            }
            // 다른 필드 업데이트 로직 추가 가능

            // 댓글 엔티티를 저장하고 반환
            CommentEntity savedComment = commentRepository.save(existingComment);

            CommentDto updatedComment = new CommentDto();
            updatedComment.setId(savedComment.getBoard().getId());
            updatedComment.setContent(savedComment.getContent());
// 다른 필드 설정


            return updatedComment;
        } else {
            return null;
        }
    }

    public boolean deleteComment(Long id) {
        try {
            commentRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // 기타 필요한 메서드 추가 가능
}
