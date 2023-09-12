package com.stockholm.main_project.board.commnet.mapper;

import com.stockholm.main_project.board.commnet.dto.CommentRequestDto;
import com.stockholm.main_project.board.commnet.dto.CommentResponseDto;
import com.stockholm.main_project.board.commnet.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    Comment commentRequestDtoToComment(CommentRequestDto commentRequestDto);

    @Mapping(source = "member.name", target = "member")
    CommentResponseDto commentToCommentResponseDto(Comment comment);
}
