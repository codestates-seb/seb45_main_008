package com.stockholm.main_project.board.mapper;

import com.stockholm.main_project.board.dto.BoardDto;
import com.stockholm.main_project.board.entity.Board;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface BoardMapper {
    BoardMapper INSTANCE = Mappers.getMapper(BoardMapper.class);

    @Mappings({
            @Mapping(source = "member.memberId", target = "memberId"),
            @Mapping(source = "comments", target = "comments"),
    })
    BoardDto boardToBoardDto(Board board);

    @Mappings({
            @Mapping(source = "memberId", target = "member.memberId"),
            @Mapping(source = "comments", target = "comments"),
    })
    Board boardDtoToBoard(BoardDto boardDto);
}

