package com.stockholm.main_project.board.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Objects;

@RestController
public class FileUploadController {

    private static final String UPLOAD_DIR = "C:\\Users\\User\\Postman"; // 업로드할 디렉터리 경로를 지정하세요.

    @PostMapping("/upload")
    public ResponseEntity<String> upload(@RequestPart MultipartFile file) {
        // 파일 형식 및 크기 검사
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("업로드할 파일을 선택하세요.");
        }

        // 파일 이름 생성 (현재 타임스탬프 사용)
        String originalFileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        String fileName = System.currentTimeMillis() + "_" + originalFileName;

        // 파일 저장 경로
        String filePath = UPLOAD_DIR + fileName;

        try {
            // 파일 저장
            File destination = new File(filePath);
            file.transferTo(destination);

            return ResponseEntity.status(HttpStatus.CREATED).body("파일 업로드 성공: " + fileName);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("파일 업로드 실패: " + originalFileName);
        }
    }
}



