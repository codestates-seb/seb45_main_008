package com.stockholm.main_project.board.controller;

import com.stockholm.main_project.board.commnet.dto.CommentResponseDto;
import com.stockholm.main_project.board.commnet.entity.Comment;
import com.stockholm.main_project.board.commnet.service.CommentService;
import com.stockholm.main_project.board.dto.responseDto.BoardCommentDto;
import com.stockholm.main_project.board.service.BoardService;
import com.stockholm.main_project.board.dto.BoardRequestDto;
import com.stockholm.main_project.board.dto.responseDto.AllBoardResponseDto;
import com.stockholm.main_project.board.dto.responseDto.SingleBoardResponseDto;
import com.stockholm.main_project.board.entity.Board; // Board 클래스를 참조하도록 수정
import com.stockholm.main_project.board.mapper.BoardMapper;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    @Autowired
    private final BoardService boardService;
    private final MemberService memberService;

    private final BoardMapper mapper;
    private final CommentService commentService;

    public BoardController(BoardService boardService, MemberService memberService, BoardMapper mapper, CommentService commentService) {
        this.boardService = boardService;
        this.memberService = memberService;
        this.mapper = mapper;

        this.commentService = commentService;
    }

    // 게시물 생성
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "게시물 생성", description = "새로운 게시물을 생성합니다.", tags = { "Board" })
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<SingleBoardResponseDto> createBoard(@Valid @RequestPart("boardData") BoardRequestDto boardPostDto,
                                                              @RequestPart(value = "image", required = false) MultipartFile imageFile,
                                                              @AuthenticationPrincipal Member member) throws Exception {
        Board boardToCreate = mapper.boardRequestToBoard(boardPostDto);
        boardToCreate.setMember(member);
        Board createdBoard = boardService.createBoard(boardToCreate, imageFile);
        SingleBoardResponseDto responseDto = mapper.boardToBoardResponseDto(createdBoard);
        return ResponseEntity.status(HttpStatus.CREATED).contentType(MediaType.APPLICATION_JSON).body(responseDto);
    }

    @PatchMapping("{boardId}")
    public ResponseEntity<SingleBoardResponseDto> updateBoard(@PathVariable long boardId,
                                                              @RequestPart("boardData") BoardRequestDto boardUpdateDto,
                                                              @RequestPart(value = "image", required = false) MultipartFile imageFile,
                                                              @AuthenticationPrincipal Member member) throws Exception {
        Board boardToUpdate = mapper.boardRequestToBoard(boardUpdateDto);
        boardToUpdate.setMember(member);
        Board updatedBoard = boardService.updateBoard(boardId, boardToUpdate, imageFile);
        SingleBoardResponseDto responseDto = mapper.boardToBoardResponseDto(updatedBoard);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("{boardId}")
    public ResponseEntity<SingleBoardResponseDto> getBoard(@PathVariable long boardId){
        Board response = boardService.findBoard(boardId);
        SingleBoardResponseDto responseDto = mapper.boardToBoardResponseDto(response);

        List<Comment> comments = commentService.findComments(boardId);
        List<BoardCommentDto> boardCommentDtos = comments
                .stream()
                .map(mapper::boardCommentToBoardCommentsDto)
                .collect(Collectors.toList());
        responseDto.setComments(boardCommentDtos);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<AllBoardResponseDto>> getBoards(){
        List<Board> foundBoards = boardService.getAllBoards();

        List<AllBoardResponseDto> responseDtos = foundBoards.stream()
                .map(mapper::boardToAllBoardResponseDto)
                .collect(Collectors.toList());

        return new ResponseEntity<>(responseDtos,HttpStatus.OK);
    }

    @DeleteMapping("{boardId}")
    public ResponseEntity<?> deleteBoard(@PathVariable long boardId) {
        boardService.deleteBoard(boardId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}