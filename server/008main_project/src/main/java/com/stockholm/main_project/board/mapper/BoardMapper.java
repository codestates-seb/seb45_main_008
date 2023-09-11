package com.stockholm.main_project.board.mapper;

import com.stockholm.main_project.board.dto.BoardPostDto;
import com.stockholm.main_project.board.dto.BoardResponseDto;
import com.stockholm.main_project.board.entity.Board;

import com.stockholm.main_project.comment.entity.CommentEntity;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface BoardMapper {



    Board boardPostToBoard(BoardPostDto requestBody);

    Board boardToBoardResponseDto(Board board);
}

