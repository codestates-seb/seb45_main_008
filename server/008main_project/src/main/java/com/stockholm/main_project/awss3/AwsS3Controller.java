package com.stockholm.main_project.awss3;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.net.URL;

@RestController
@RequestMapping("/s3")
public class AwsS3Controller {

    private final AwsS3Service s3Service;

    public AwsS3Controller(AwsS3Service s3Service) {
        this.s3Service = s3Service;
    }


    // 이미지 업로드
    @PostMapping("/upload")
    public URL uploadFile(@RequestParam MultipartFile file) throws Exception {
        return s3Service.uploadFile(file);
    }

    // 이미지 삭제
    @DeleteMapping("/delete/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String fileName) {
        s3Service.deleteFile(fileName);
        return ResponseEntity.ok("파일이 삭제 되었습니다.");
    }

    // 이미지 URL 가져오기
    @GetMapping("/url/{fileName}")
    public ResponseEntity<URL> getFileUrl(@PathVariable String fileName) {
        URL url = s3Service.getFileUrl(fileName);
        return ResponseEntity.ok(url);
    }
}