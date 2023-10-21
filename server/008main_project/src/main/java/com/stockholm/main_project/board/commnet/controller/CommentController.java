package com.stockholm.main_project.board.commnet.controller;

import com.stockholm.main_project.board.commnet.dto.CommentRequestDto;
import com.stockholm.main_project.board.commnet.dto.CommentResponseDto;
import com.stockholm.main_project.board.commnet.entity.Comment;
import com.stockholm.main_project.board.commnet.mapper.CommentMapper;
import com.stockholm.main_project.board.commnet.service.CommentService;
import com.stockholm.main_project.board.dto.responseDto.SingleBoardResponseDto;
import com.stockholm.main_project.board.entity.Board;

import com.stockholm.main_project.board.service.BoardService;
import com.stockholm.main_project.member.dto.MemberPostDto;
import com.stockholm.main_project.member.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
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

    @Operation(summary = "댓글 생성", description = "새로운 댓글을 생성합니다.", tags = { "Comment" })
    @ApiResponse(responseCode = "201", description = "CREATED",
            content = @Content(schema = @Schema(implementation = CommentResponseDto.class)))
    @PostMapping
    public ResponseEntity postComment(@Schema(implementation = CommentRequestDto.class)@PathVariable long boardId, @RequestBody CommentRequestDto commentRequestDto,@Parameter(hidden = true) @AuthenticationPrincipal Member member){

        Comment comment = mapper.commentRequestDtoToComment(commentRequestDto);
        comment.setBoard(boardService.findBoard(boardId));
        comment.setMember(member);

        Comment createdComment = commentService.createComment(comment);
        CommentResponseDto responseDto = mapper.commentToCommentResponseDto(createdComment);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }
    @Operation(summary = "댓글 수정", description = "작성한 댓글을 수정합니다.", tags = { "Comment" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(schema = @Schema(implementation = CommentResponseDto.class)))
    @ApiResponse(responseCode = "404", description = "INVALID FAILED")
    @PatchMapping("{commentId}")
    public ResponseEntity updateComment(@PathVariable long boardId,
                                        @PathVariable long commentId,
                                        @RequestBody CommentRequestDto commentRequestDto,
                                        @Parameter(hidden = true) @AuthenticationPrincipal Member member){

        Comment comment = mapper.commentRequestDtoToComment(commentRequestDto);
        comment.setCommentId(commentId);

        Comment updatedComment = commentService.updateComment(commentId, comment, member);
        CommentResponseDto responseDto = mapper.commentToCommentResponseDto(updatedComment);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @Operation(summary = "댓글 삭제", description = "작성한 댓글를 삭제합니다.", tags = { "Comment" })
    @ApiResponse(responseCode = "204", description = "NO CONTENT")
    @ApiResponse(responseCode = "404", description = "INVALID FAILED")
    @DeleteMapping("{commentId}")
    public ResponseEntity deleteComment(@PathVariable long boardId, @PathVariable long commentId,@Parameter(hidden = true) @AuthenticationPrincipal Member member) {

        commentService.deleteComment(commentId, member);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
