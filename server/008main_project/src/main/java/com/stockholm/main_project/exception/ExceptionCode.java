package com.stockholm.main_project.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다"),
    INVALID_EMAIL(404, "유효하지 않은 이메일 형식입니다"),
    INVALID_NAME(400, "이름이 유효하지 않습니다"),
    INVALID_CASH(404, "금액을 조회할 수 없습니다."),
    EMAIL_DUPLICATION(400, "이미 존재하는 이메일입니다."),
    INVALID_PASSWORD(404, "비밀번호가 일치하지 않거나 유효하지 않습니다."),
    INVALID_TOKEN(400, "유효하지 않은 토큰입니다"),
    LOGIN_FAILED(401, "로그인에 실패하였습니다. 사용자 이름 또는 비밀번호를 확인해주세요");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
