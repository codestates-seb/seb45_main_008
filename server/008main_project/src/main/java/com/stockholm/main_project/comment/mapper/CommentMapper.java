package com.stockholm.main_project.comment.mapper;

import com.stockholm.main_project.comment.dto.CommentDto;
import com.stockholm.main_project.comment.entity.CommentEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    CommentMapper INSTANCE = Mappers.getMapper(CommentMapper.class);

    @Mappings({
            @Mapping(source = "board.id", target = "postId"),
            // 다른 필드 매핑 추가
    })
    CommentDto commentEntityToDto(CommentEntity commentEntity);

    @Mappings({
            @Mapping(source = "postId", target = "board.id"),
            // 다른 필드 매핑 추가
    })
    CommentEntity commentDtoToEntity(CommentDto commentDto);
}

