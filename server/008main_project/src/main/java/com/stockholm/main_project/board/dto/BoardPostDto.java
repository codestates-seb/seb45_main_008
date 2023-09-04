package com.stockholm.main_project.board.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@NoArgsConstructor
public class BoardPostDto {
    @NotBlank(message = "제목을 입력해 주세요")
    @Size(max = 30, message = "제목의 길이는 30자를 넘을 수 없습니다")
    private String title;

    @NotBlank(message = "내용을 입력해 주세요")
    @Size(max = 100, message = "내용은 100자를 넘을 수 없습니다")
    private String content;

    // 게터, 세터, 생성자 등 필요한 메서드 추가 가능
}
