package com.stockholm.main_project.board.Controller;

import com.stockholm.main_project.board.Service.BoardService;
import com.stockholm.main_project.board.dto.BoardPostDto;
import com.stockholm.main_project.board.dto.BoardResponseDto;
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
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/boards")
public class BoardController {

    @Autowired
    private final BoardService boardService;
    private final MemberService memberService;

    private final BoardMapper mapper;

    public BoardController(BoardService boardService, MemberService memberService, BoardMapper mapper) {
        this.boardService = boardService;
        this.memberService = memberService;
        this.mapper = mapper;
    }

    // 게시물 생성
    @PostMapping
    @Operation(summary = "게시물 생성", description = "새로운 게시물을 생성합니다.", tags = { "Board" })
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity createPost(@Valid @RequestBody BoardPostDto boardPostDto) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberService.findMemberByEmail(auth.getPrincipal().toString());

        Board boardToCreate = mapper.boardPostToBoard(boardPostDto);

        boardToCreate.setMember(member);

        Board createdBoard = boardService.createBoard(boardToCreate);
        Board responseDto = mapper.boardToBoardResponseDto(createdBoard);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    // 모든 게시물 조회
    @GetMapping
    @Operation(summary = "모든 게시물 조회", description = "모든 게시물을 조회합니다.", tags = { "Board" })
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<List<Board>> getAllBoards() {
        List<Board> boards = boardService.getAllBoards();
        return new ResponseEntity<>(boards, HttpStatus.OK);
    }

    // 특정 게시물 조회
    @GetMapping("/{boardId}")
    @Operation(summary = "특정 게시물 조회", description = "특정 게시물을 생성합니다.", tags = { "Board" })
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<Board> getBoardById(@PathVariable Long boardId) {
        Board board = boardService.getBoardById(boardId);
        if (board != null) {
            return new ResponseEntity<>(board, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // 게시물 업데이트
    @PutMapping("/{boardId}")
    @Operation(summary = "게시물 업데이트", description = "게시물을 업데이트합니다.", tags = { "Board" })
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<Board> updateBoard(@PathVariable Long boardId, @RequestBody @Valid Board board) {
        Board updatedBoard = boardService.updateBoard(boardId, board);
        if (updatedBoard != null) {
            return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    //게시물 수정
    @PatchMapping("/{boardId}")
    @Operation(summary = "게시물 수정", description = "게시물을 수정합니다.", tags = { "Board" })
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<Board> patchBoard(
            @PathVariable Long boardId,
            @RequestBody Map<String, Object> updates) {

        // Authentication 객체를 사용하여 현재 사용자 정보 가져오기
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberService.findMemberByEmail(auth.getPrincipal().toString());

        Board updatedBoard = boardService.patchBoard(boardId, updates, member);

        if (updatedBoard != null) {
            return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // 게시물 삭제

    @DeleteMapping("/{boardId}")
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) {
        // Authentication 객체를 사용하여 현재 사용자 정보 가져오기
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Member member = memberService.findMemberByEmail(auth.getPrincipal().toString());

        boolean deleted = boardService.deleteBoard(boardId, member);
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}