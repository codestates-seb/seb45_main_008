package com.stockholm.main_project.comment.Controller;

import com.stockholm.main_project.board.Repository.BoardRepository;
import com.stockholm.main_project.board.entity.Board;
import com.stockholm.main_project.comment.Service.CommentService;
import com.stockholm.main_project.comment.dto.CommentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/comments")
public class CommentController {

    private final CommentService commentService;
    private final BoardRepository boardRepository;

    @Autowired
    public CommentController(CommentService commentService, BoardRepository boardRepository) {
        this.commentService = commentService;
        this.boardRepository = boardRepository;
    }

    // 댓글 생성
    @PostMapping("/{boardId}")
    public ResponseEntity<CommentDto> createComment(@RequestBody CommentDto commentDto, @PathVariable Long boardId) {
        // 데이터 검증: 입력된 데이터가 유효한지 확인
        if (commentDto == null || commentDto.getContent() == null || commentDto.getContent().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        // 게시판 확인
        Board board = boardRepository.findById(boardId).orElse(null);
        if (board == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // 서비스 계층에서 댓글 생성 로직 수행
        CommentDto createdComment = commentService.createComment(commentDto.getContent(), boardId);
        if (createdComment != null) {
            return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 댓글 조회 by ID
    @GetMapping("/{id}")
    public ResponseEntity<CommentDto> getCommentById(@PathVariable Long id) {
        CommentDto comment = commentService.getCommentById(id);
        if (comment != null) {
            return new ResponseEntity<>(comment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 댓글 수정
    @PatchMapping("/{id}")
    public ResponseEntity<CommentDto> partialUpdateComment(@PathVariable Long id, @RequestBody CommentDto updatedCommentDto) {
        if (updatedCommentDto == null || updatedCommentDto.getContent() == null || updatedCommentDto.getContent().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        CommentDto updatedComment = commentService.partialUpdateComment(id, updatedCommentDto);
        if (updatedComment != null) {
            return new ResponseEntity<>(updatedComment, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 댓글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        boolean deleted = commentService.deleteComment(id);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}

