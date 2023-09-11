package com.stockholm.main_project.board.Service;

import com.stockholm.main_project.board.Repository.BoardRepository;
import com.stockholm.main_project.board.entity.Board;
import com.stockholm.main_project.member.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    // 이하 메서드들은 그대로 유지합니다.

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
        board.setId(boardId);
        return boardRepository.save(board);
    }

    public boolean deleteBoard(Long boardId, Member member) {
        // 게시물 삭제 로직 구현
        Optional<Board> existingBoardOptional = boardRepository.findById(boardId);

        if (existingBoardOptional.isPresent()) {
            Board existingBoard = existingBoardOptional.get();

            // 권한 검사
            if (existingBoard.getMember().equals(member)) {
                if (boardRepository.existsById(boardId)) {
                    boardRepository.deleteById(boardId);
                    return true;
                }
            }
        }
        return false; // 권한이 없거나 게시물을 삭제하지 못한 경우
    }



    public Board patchBoard(Long boardId, Map<String, Object> updates, Member member) {
        // 게시물 및 사용자 권한 검사
        Optional<Board> existingBoardOptional = boardRepository.findById(boardId);

        if (existingBoardOptional.isPresent()) {
            Board existingBoard = existingBoardOptional.get();
            if (existingBoard.getMember().equals(member)) {
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
                // 권한이 없는 경우에 대한 처리를 여기서 수행
                return null;
            }
        } else {
            return null; // 게시물을 찾을 수 없음
        }
    }


    // 아래 메서드는 게시물과 관련된 댓글을 함께 조회하는 메서드입니다.
    @Transactional(readOnly = true)
    public Board getBoardWithComments(Long boardId) {
        Optional<Board> boardOptional = boardRepository.findByIdWithComments(boardId);
        return boardOptional.orElse(null);
    }

}