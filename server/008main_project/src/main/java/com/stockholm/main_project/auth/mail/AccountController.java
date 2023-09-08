package com.stockholm.main_project.auth.mail;

import com.stockholm.main_project.auth.mail.Dto.ConfirmPostDto;
import com.stockholm.main_project.auth.mail.Dto.SendEmailPostDto;
import com.stockholm.main_project.member.dto.MemberPatchDto;
import com.stockholm.main_project.member.dto.MemberResponseDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
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



    @Operation(summary = "Email 발송", description = "Email 검증을 위한 코드가 POST됩니다.", tags = { "Email" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(schema = @Schema(implementation = SendEmailPostDto.class),
                    examples = @ExampleObject(value = "4148WEAW1")))
    @ApiResponse(responseCode = "400", description = "BAD REQUEST")
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    @PostMapping("/email/send")
    public String emailSend(@Schema(implementation = SendEmailPostDto.class) @RequestBody SendEmailPostDto sendEmailPostDto) throws Exception {

        String confirm = emailService.sendSimpleMessage(sendEmailPostDto.getEmail());

        return confirm;
    }

    @Operation(summary = "Email 검증", description = "Email로 발송된 코드에 대한 검증을 POST됩니다.", tags = { "Email" })
    @ApiResponse(responseCode = "200", description = "OK",
            content = @Content(schema = @Schema(implementation = ConfirmPostDto.class),
                    examples = @ExampleObject(value = "인증 성공")))
    @ApiResponse(responseCode = "400", description = "BAD REQUEST",
            content = @Content(schema = @Schema(implementation = ConfirmPostDto.class),
                    examples = @ExampleObject(value = "인증 실패")))
    @ApiResponse(responseCode = "500", description = "INTERNAL SERVER ERROR")
    @PostMapping("/email/confirm")
    public ResponseEntity<String> emailConfirm(@Schema(implementation = ConfirmPostDto.class) @RequestBody ConfirmPostDto confirmPostDto) throws Exception {
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