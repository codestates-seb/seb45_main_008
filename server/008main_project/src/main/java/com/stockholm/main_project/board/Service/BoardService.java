package com.stockholm.main_project.board.Service;

import com.stockholm.main_project.board.Repository.BoardRepository;
import com.stockholm.main_project.board.entity.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    public Board createBoard(Board board) {
        // 게시물 생성 로직 구현
        return boardRepository.save(board);
    }

    public List<Board> getAllBoards() {
        // 모든 게시물 조회 로직 구현
        return boardRepository.findAll();
    }

    public Board getBoardById(Long boardId) {
        // 특정 게시물 조회 로직 구현
        return boardRepository.findById(boardId).orElse(null);
    }

    public Board updateBoard(Long boardId, Board board) {
        // 게시물 업데이트 로직 구현
        board.setBoardId(boardId);
        return boardRepository.save(board);
    }

    public boolean deleteBoard(Long boardId) {
        // 게시물 삭제 로직 구현
        if (boardRepository.existsById(boardId)) {
            boardRepository.deleteById(boardId);
            return true;
        }
        return false;
    }

    // 게시물 일부 업데이트를 처리하는 메서드 추가
    public Board patchBoard(Long boardId, Map<String, Object> updates) {
        Optional<Board> existingBoardOptional = boardRepository.findById(boardId);

        if (existingBoardOptional.isPresent()) {
            Board existingBoard = existingBoardOptional.get();

            // 'updates' 맵의 값을 기반으로 필드 업데이트
            if (updates.containsKey("title")) {
                existingBoard.setTitle((String) updates.get("title"));
            }
            if (updates.containsKey("content")) {
                existingBoard.setContent((String) updates.get("content"));
            }
            // 필요한 경우 업데이트할 필드를 추가합니다.

            return boardRepository.save(existingBoard);
        } else {
            return null; // 게시물을 찾을 수 없음
        }
    }
}
