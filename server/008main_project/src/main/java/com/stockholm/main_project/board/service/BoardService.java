package com.stockholm.main_project.board.service;

import com.stockholm.main_project.board.repository.BoardRepository;
import com.stockholm.main_project.board.entity.Board;
import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import com.stockholm.main_project.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Board createBoard(Board board) {

        return boardRepository.save(board);
    }

    public Board updateBoard(long boardId, Board updatedBoard, Member member) {
        Board existingBoard = findBoard(boardId);

        existingBoard.setTitle(updatedBoard.getTitle());
        existingBoard.setContent(updatedBoard.getContent());

        return boardRepository.save(existingBoard);
    }

    public Board findBoard(long boardId) {

        return findVerifiedBoard(boardId);
    }

    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    public void deleteBoard(long boardId) {
        Board board = findBoard(boardId);

        boardRepository.delete(board);
    }

    public Board findVerifiedBoard(long boardId) {

        Optional<Board> optionalBoard =
                boardRepository.findByBoardId(boardId);
        Board findBoard =
                optionalBoard.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.BOARD_NOT_FOUND));
        return findBoard;
    }
}