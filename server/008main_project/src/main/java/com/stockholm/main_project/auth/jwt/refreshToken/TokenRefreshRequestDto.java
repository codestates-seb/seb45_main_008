package com.stockholm.main_project.auth.jwt.refreshToken;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TokenRefreshRequestDto {
    @Schema(description = "refreshToken", defaultValue = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlcklkIjoxMDMsInN1YiI6InRlc3QwMTUxQG5hdmVyLmNvbSIsImlhdCI6MTY5NjkzNTA1NSwiZXhwIjoxNjk2OTYwMjU1fQ.F9IfWW_EKd7cFGYtd95B3_CcfSr2w1HLmIlEMK0fyN")
    private String refreshToken;

}