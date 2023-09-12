package com.stockholm.main_project.exception;

import com.stockholm.main_project.stock.entity.StockAsBi;
import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다"),
    INVALID_EMAIL(404, "유효하지 않은 이메일 형식입니다"),
    INVALID_NAME(400, "이름이 유효하지 않습니다"),
    INVALID_CASH(404, "금액을 조회할 수 없습니다."),
    EMAIL_DUPLICATION(400, "이미 존재하는 이메일입니다."),
    INVALID_PASSWORD(404, "비밀번호가 일치하지 않거나 유효하지 않습니다."),
    BOARD_NOT_FOUND(404, "게시물을 찾을 수 없습니다."),
    COMMENT_NOT_FOUND(404, "댓글을 찾을 수 없습니다."),
    INVALID_FAILED(404, "유효하지 않은 접근입니다."),
    STOCKASBI_NOT_FOUND(404, "호가 정보를 찾을 수 없습니다"),
    STOCKHOLD_NOT_FOUND(404, "보유 주식 정보가 없습니다."),
    INSUFFICIENT_STOCK(422,"보유 주식이 부족합니다"),
    NOT_ENOUGH_MONEY(422, "보유 금액이 부족합니다"),
    STOCKORDER_NOT_FOUND(404, "주식 거래내역이 존재하지 않습니다"),
    STOCKORDER_PERMISSION_DENIED(400,"잘못된 삭제 요청입니다."),
    STOCKORDER_ALREADY_FINISH(400, "이미 완료된 거래입니다");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
