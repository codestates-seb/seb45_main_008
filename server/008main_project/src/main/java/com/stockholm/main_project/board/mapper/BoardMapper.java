package com.stockholm.main_project.board.mapper;

import com.stockholm.main_project.board.commnet.entity.Comment;
import com.stockholm.main_project.board.dto.BoardRequestDto;
import com.stockholm.main_project.board.dto.responseDto.AllBoardResponseDto;
import com.stockholm.main_project.board.dto.responseDto.BoardCommentDto;
import com.stockholm.main_project.board.dto.responseDto.SingleBoardResponseDto;
import com.stockholm.main_project.board.entity.Board;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface BoardMapper {



    Board boardRequestToBoard(BoardRequestDto requestBody);

    @Mapping(source = "member.name", target = "member")
    SingleBoardResponseDto boardToBoardResponseDto(Board board);

    @Mapping(source = "member.name", target = "member")
    AllBoardResponseDto boardToAllBoardResponseDto(Board board);

    @Mapping(source = "member.name", target = "member")
    BoardCommentDto boardCommentToBoardCommentsDto(Comment comment);
}

