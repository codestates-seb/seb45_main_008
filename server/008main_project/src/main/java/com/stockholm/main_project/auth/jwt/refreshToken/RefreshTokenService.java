package com.stockholm.main_project.auth.jwt.refreshToken;

import com.stockholm.main_project.auth.filter.JwtVerificationFilter;
import com.stockholm.main_project.auth.jwt.JwtTokenizer;
import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class RefreshTokenService {

    @Autowired
    private JwtTokenizer jwtTokenizer;

    private final JwtVerificationFilter jwtVerificationFilter;

    public RefreshTokenService(JwtVerificationFilter jwtVerificationFilter) {
        this.jwtVerificationFilter = jwtVerificationFilter;
    }

    public String requestNewAccessToken(String refreshToken) throws Exception {
        // 리프레시 토큰을 검증하고, 필요한 클레임을 추출합니다.
        Map<String, Object> refreshTokenClaims = validateRefreshToken(refreshToken);

        // 새로운 액세스 토큰을 생성합니다.
        String newAccessToken = jwtVerificationFilter.generateAccessTokenFromRefreshToken(refreshTokenClaims);

        return newAccessToken;
    }

    private Map<String, Object> validateRefreshToken(String refreshToken) throws Exception {
        try {
            String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

            // 리프레시 토큰을 검증하고 클레임을 추출합니다.
            Map<String, Object> refreshTokenClaims = jwtTokenizer.getClaims(refreshToken, base64EncodedSecretKey).getBody();

            // 여기에서 리프레시 토큰의 유효성을 추가적으로 검증하거나 필요한 클레임을 확인할 수 있습니다.

            return refreshTokenClaims;
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN);
        }
    }

}
