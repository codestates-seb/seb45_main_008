package com.stockholm.main_project.board.Controller;

import com.stockholm.main_project.board.Service.BoardService;
import com.stockholm.main_project.board.entity.Board; // Board 클래스를 참조하도록 수정
import com.stockholm.main_project.swaggersample.HelloResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/boards")
public class BoardController {

    @Autowired
    private BoardService boardService;

    // 게시물 생성
    @PostMapping
    @Operation(summary = "게시물 생성", description = "새로운 게시물을 생성합니다.", tags = { "Board" })
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<Board> createPost(@RequestBody @Valid Board board) {
        Board createdBoard = boardService.createBoard(board);
        return new ResponseEntity<>(createdBoard, HttpStatus.CREATED);
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

        Board updatedBoard = boardService.patchBoard(boardId, updates);

        if (updatedBoard != null) {
            return new ResponseEntity<>(updatedBoard, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    // 게시물 삭제
    @DeleteMapping("/{boardId}") // 변수 이름도 수정
    @Operation(summary = "게시물 삭제", description = "게시물을 삭제합니다.", tags = { "Board" })
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Created", content = @Content(schema = @Schema(implementation = Board.class))),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    public ResponseEntity<Void> deleteBoard(@PathVariable Long boardId) { // 변수 이름도 수정
        boolean deleted = boardService.deleteBoard(boardId); // 서비스 메서드도 수정
        if (deleted) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
