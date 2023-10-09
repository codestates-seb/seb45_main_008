package com.stockholm.main_project.auth.jwt.refreshToken;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/tokens")
public class TokenController {

    @Autowired
    private RefreshTokenService refreshTokenService;

    @PostMapping("/refresh")
    public ResponseEntity<String> refreshAccessToken(@RequestBody TokenRefreshRequestDto tokenRefreshRequestDto) {
        try {
            String newAccessToken = refreshTokenService.requestNewAccessToken(tokenRefreshRequestDto.getRefreshToken());
            return ResponseEntity.ok(newAccessToken);
        } catch (Exception e) {
            // 실패한 경우 401 Unauthorized 상태 코드 반환
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
