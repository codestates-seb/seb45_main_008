package com.stockholm.main_project.board.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class BoardRequestDto {
    @Schema(description = "게시물 제목", defaultValue = "TestBoard")
    @NotBlank(message = "제목을 입력해 주세요")
    @Size(max = 30, message = "제목의 길이는 30자를 넘을 수 없습니다")
    private String title;

    @Schema(description = "게시물 내용", defaultValue = "TestContent")
    @NotBlank(message = "내용을 입력해 주세요")
    @Size(max = 100, message = "내용은 100자를 넘을 수 없습니다")
    private String content;

}
