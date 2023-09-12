package com.stockholm.main_project.board.service;

import com.stockholm.main_project.awss3.AwsS3Service;
import com.stockholm.main_project.board.repository.BoardRepository;
import com.stockholm.main_project.board.entity.Board;
import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import com.stockholm.main_project.member.entity.Member;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.net.URL;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class BoardService {

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private AwsS3Service awsS3Service;

    public Board createBoard(Board board, MultipartFile imageFile) throws Exception {
        if (imageFile != null) {
            URL imageUrl = awsS3Service.uploadFile("boards", imageFile);
            board.setImageUrl(imageUrl.toString());
        }
        return boardRepository.save(board);
    }

    public Board updateBoard(long boardId, Board updatedBoard, MultipartFile imageFile) throws Exception {
        Board existingBoard = findBoard(boardId);
        if (imageFile != null) {
            // 기존 이미지 삭제
            if (existingBoard.getImageUrl() != null) {
                awsS3Service.deleteFile("boards", existingBoard.getImageUrl());
            }

            // 새 이미지 업로드
            URL imageUrl = awsS3Service.uploadFile("boards", imageFile);
            existingBoard.setImageUrl(imageUrl.toString());
        }

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
        if (board.getImageUrl() != null) {
            awsS3Service.deleteFile("boards", board.getImageUrl());
        }
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