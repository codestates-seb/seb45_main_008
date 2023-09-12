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
    @PostMapping("/upload/{folderName}")
    public URL uploadFile(@PathVariable String folderName, @RequestParam MultipartFile file) throws Exception {
        return s3Service.uploadFile(folderName, file);
    }

    // 이미지 삭제
    @DeleteMapping("/delete/{folderName}/{fileName}")
    public ResponseEntity<String> deleteFile(@PathVariable String folderName, @PathVariable String fileName) {
        s3Service.deleteFile(folderName, fileName);
        return ResponseEntity.ok("파일이 삭제 되었습니다.");
    }

    // 이미지 URL 가져오기
    @GetMapping("/url/{folderName}/{fileName}")
    public ResponseEntity<URL> getFileUrl(@PathVariable String folderName, @PathVariable String fileName) {
        URL url = s3Service.getFileUrl(folderName, fileName);
        return ResponseEntity.ok(url);
    }
}