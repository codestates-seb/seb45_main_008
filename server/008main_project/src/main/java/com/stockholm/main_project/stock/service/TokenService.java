package com.stockholm.main_project.stock.service;

import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import com.stockholm.main_project.stock.repository.TokenRepository;
import com.stockholm.main_project.stock.entity.Token;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;


@Service
@Transactional
public class TokenService {

    private final TokenRepository tokenRepository;

    @Getter
    @Value("${token.app-key}")
    private String APP_KEY;

    @Getter
    @Value("${token.app-secret}")
    private String APP_SECRET;

    @Getter
    @Value("${stock-url.token}")
    private String TOKEN_URL;

    private RestTemplate restTemplate = new RestTemplate();

    public TokenService(TokenRepository tokenRepository) {
        this.tokenRepository = tokenRepository;
    }

    public String getAccessToken() {
        try {
            if(tokenVerification()) {
                Optional<Token> token = tokenRepository.findById(1L);
                if(token.isEmpty()) {
                    throw new BusinessLogicException(ExceptionCode.TOKEN_REPOSITORY_ERROR);
                }
                return token.get().getToken();
            } else {
                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                Map<String, String> body = new HashMap<>();
                body.put("grant_type", "client_credentials");
                body.put("appkey", APP_KEY);
                body.put("appsecret", APP_SECRET);

                HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
                ResponseEntity<Map> response = restTemplate.postForEntity(TOKEN_URL, request, Map.class);

                if(!response.getBody().containsKey("access_token")) {
                    throw new BusinessLogicException(ExceptionCode.TOKEN_NOT_FOUND_IN_RESPONSE);
                }

                Optional<Token> token = tokenRepository.findById(1L);
                if(token.isEmpty()) {
                    Token newToken = new Token();
                    newToken.setTokenId(1L);
                    newToken.setToken(response.getBody().get("access_token").toString());
                    newToken.setExpired(LocalDateTime.now().plusDays(1));
                    tokenRepository.save(newToken);
                } else {
                    token.get().setToken(response.getBody().get("access_token").toString());
                    token.get().setExpired(LocalDateTime.now().plusDays(1));
                    tokenRepository.save(token.get());
                }
                return response.getBody().get("access_token").toString();
            }
        } catch(HttpClientErrorException | HttpServerErrorException e) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_SERVICE_ERROR);
        }
    }

    public boolean tokenVerification() {
        try {
            LocalDateTime currentDateTime = LocalDateTime.now();
            Optional<Token> token = tokenRepository.findById(1L);
            if(token.isEmpty() || currentDateTime.isAfter(token.get().getExpired())) {
                return false;
            } else {
                return true;
            }
        } catch(Exception e) {
            throw new BusinessLogicException(ExceptionCode.TOKEN_REPOSITORY_ERROR);
        }
    }
}

//@Service
//@Transactional
//public class TokenService {
//
//    public TokenService(TokenRepository tokenRepository) {
//        this.tokenRepository = tokenRepository;
//    }
//
//    private final TokenRepository tokenRepository;
//
//    @Getter
//    @Value("${token.app-key}")
//    private String APP_KEY;
//
//    @Getter
//    @Value("${token.app-secret}")
//    private String APP_SECRET;
//
//    @Getter
//    @Value("${stock-url.token}")
//    private String TOKEN_URL;
//
//    private RestTemplate restTemplate = new RestTemplate();
//
//    public String getAccessToken() {
//
//        // 만료 되지 않았을 경우
//        if(tokenVerification()) {
//            Optional<Token> token = tokenRepository.findById(1L);
//
//            return token.get().getToken();
//
//        }
//        // 만료 되었을 경우
//        else {
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//
//            Map<String, String> body = new HashMap<>();
//            body.put("grant_type", "client_credentials");
//            body.put("appkey", APP_KEY);
//            body.put("appsecret", APP_SECRET);
//
//            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, headers);
//
//            ResponseEntity<Map> response = restTemplate.postForEntity(TOKEN_URL, request, Map.class);
//
//            Optional<Token> token = tokenRepository.findById(1L);
//
//            if(token.isEmpty()) {
//                Token newToken = new Token();
//
//                newToken.setTokenId(1L);
//                newToken.setToken(response.getBody().get("access_token").toString());
//                newToken.setExpired(LocalDateTime.now().plusDays(1));
//
//                tokenRepository.save(newToken);
//
//            }
//            else {
//                token.get().setToken(response.getBody().get("access_token").toString());
//                token.get().setExpired(LocalDateTime.now().plusDays(1));
//
//                tokenRepository.save(token.get());
//
//            }
//
//            return response.getBody().get("access_token").toString();
//        }
//    }
//
//    public boolean tokenVerification() {
//        LocalDateTime currentDateTime = LocalDateTime.now();
//        Optional<Token> token = tokenRepository.findById(1L);
//
//        // 토큰이 비어있거나, 현재 시간이 토큰 유효간보다 뒤에 있을 때(만료 됨)
//        if( token.isEmpty() || currentDateTime.isAfter(token.get().getExpired()))
//            return false;
//        else
//            return true;
//    }
//}
