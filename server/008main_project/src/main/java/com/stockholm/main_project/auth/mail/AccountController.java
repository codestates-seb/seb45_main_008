package com.stockholm.main_project.auth.mail;

import com.stockholm.main_project.auth.mail.Dto.ConfirmPostDto;
import com.stockholm.main_project.auth.mail.Dto.SendEmailPostDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AccountController {

    private final EmailService emailService;


    @PostMapping("/email/send")
    public String emailConfirm(@RequestBody SendEmailPostDto sendEmailPostDto) throws Exception {

        String confirm = emailService.sendSimpleMessage(sendEmailPostDto.getEmail());

        return confirm;
    }

    @PostMapping("/email/confirm")
    public ResponseEntity<String> emailConfirm(@RequestBody ConfirmPostDto confirmPostDto) throws Exception {
        // 사용자가 입력한 코드(code)와 생성된 코드(ePw)를 비교
        String email = confirmPostDto.getEmail();
        String code = confirmPostDto.getCode();

        if (code.equals(EmailServiceImpl.ePw)) {
            return ResponseEntity.status(HttpStatus.OK).body("인증 성공");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("인증 실패");
        }
    }
}