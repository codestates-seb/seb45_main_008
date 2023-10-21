package com.stockholm.main_project.auth.jwt.refreshToken;

import com.stockholm.main_project.member.dto.MemberResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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

    @Operation(summary = "엑세스 토큰 재 발급", description = "엑세스 토큰을 재 발급합니다.", tags = { "Token" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(schema = @Schema(implementation = TokenRefreshRequestDto.class)))
    @ApiResponse(responseCode = "401", description = "INVALID REFRESH TOKEN")
    @PostMapping("/refresh")
    public ResponseEntity<String> refreshAccessToken(@RequestBody TokenRefreshRequestDto tokenRefreshRequestDto) throws Exception {

            String newAccessToken = refreshTokenService.requestNewAccessToken(tokenRefreshRequestDto.getRefreshToken());
            return ResponseEntity.ok(newAccessToken);

    }
}
