package com.stockholm.main_project.board.commnet.controller;

import com.stockholm.main_project.board.commnet.dto.CommentRequestDto;
import com.stockholm.main_project.board.commnet.dto.CommentResponseDto;
import com.stockholm.main_project.board.commnet.entity.Comment;
import com.stockholm.main_project.board.commnet.mapper.CommentMapper;
import com.stockholm.main_project.board.commnet.service.CommentService;
import com.stockholm.main_project.board.dto.responseDto.SingleBoardResponseDto;
import com.stockholm.main_project.board.entity.Board;

import com.stockholm.main_project.board.service.BoardService;
import com.stockholm.main_project.member.entity.Member;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/boards/{boardId}/comments")
public class CommentController {

    private final CommentService commentService;
    private final BoardService boardService;
    private final CommentMapper mapper;


    public CommentController(CommentService commentService, BoardService boardService, CommentMapper mapper) {
        this.commentService = commentService;
        this.boardService = boardService;
        this.mapper = mapper;
    }

    @PostMapping
    public ResponseEntity postComment(@PathVariable long boardId, @RequestBody CommentRequestDto commentRequestDto, @AuthenticationPrincipal Member member){

        Comment comment = mapper.commentRequestDtoToComment(commentRequestDto);
        comment.setBoard(boardService.findBoard(boardId));
        comment.setMember(member);

        Comment createdComment = commentService.createComment(comment);
        CommentResponseDto responseDto = mapper.commentToCommentResponseDto(createdComment);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }
    @PatchMapping("{commentId}")
    public ResponseEntity updateComment(@PathVariable long boardId,
                                        @PathVariable long commentId,
                                        @RequestBody CommentRequestDto commentRequestDto,
                                        @AuthenticationPrincipal Member member){

        Comment comment = mapper.commentRequestDtoToComment(commentRequestDto);
        comment.setCommentId(commentId);

        Comment updatedComment = commentService.updateComment(commentId, comment, member);
        CommentResponseDto responseDto = mapper.commentToCommentResponseDto(updatedComment);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("{commentId}")
    public ResponseEntity deleteComment(@PathVariable long boardId, @PathVariable long commentId, @AuthenticationPrincipal Member member) {

        commentService.deleteComment(commentId, member);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
