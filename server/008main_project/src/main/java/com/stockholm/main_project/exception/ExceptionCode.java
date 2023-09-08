package com.stockholm.main_project.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "회원을 찾을 수 없습니다"),
    INVALID_EMAIL(404, "유효하지 않은 이메일 형식입니다"),
    INVALID_NAME(400, "이름이 유효하지 않습니다"),
    EMAIL_DUPLICATION(400, "이미 존재하는 이메일입니다."),
    INVALID_PASSWORD(404, "비밀번호가 일치하지 않거나 유효하지 않습니다."),
    INVALID_TOKEN(400, "유효하지 않은 토큰입니다"),
    LOGIN_FAILED(401, "로그인에 실패하였습니다. 사용자 이름 또는 비밀번호를 확인해주세요"),
    TOKEN_REPOSITORY_ERROR(500, "토큰 저장소에서 토큰을 가져오는데 실패하였습니다."),
    TOKEN_SERVICE_ERROR(500, "외부 서비스에서 토큰을 가져오는데 실패하였습니다."),
    TOKEN_NOT_FOUND_IN_RESPONSE(400, "응답에 토큰이 포함되어 있지 않습니다."),
    COMPANY_RETRIEVAL_ERROR(500, "회사 정보를 가져오는데 실패하였습니다."),
    API_CALL_ERROR(500, "API 호출에 실패하였습니다."),
    DATA_PERSISTENCE_ERROR(500, "데이터 저장에 실패하였습니다."),
    DATA_RETRIEVAL_ERROR(500, "데이터 조회에 실패하였습니다."),
    COMPANY_NOT_FOUND(404, "요청한 회사 정보를 찾을 수 없습니다."),
    COMPANY_LIST_RETRIEVAL_ERROR(500, "회사 목록을 가져오는데 실패하였습니다."),
    DATA_MAPPING_ERROR(500, "데이터 변환에 문제가 발생하였습니다."),
    TOKEN_RETRIEVAL_ERROR(401, "토큰을 가져오는데 실패하였습니다."),
    API_RESPONSE_ERROR(500, "API 응답이 유효하지 않습니다."),
    S3_UPLOAD_ERROR(500, "S3 파일 업로드 중 오류 발생"),
    S3_DELETE_ERROR(500, "S3 파일 삭제 중 오류 발생"),
    S3_URL_RETRIEVE_ERROR(500, "S3에서 파일 URL 검색 중 오류 발생"),
    AWS_CREDENTIALS_ERROR(401, "AWS 인증 오류");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
