package com.stockholm.main_project.awss3;

import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "파일 업로드", description = "파일을 업로드합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "파일 업로드 성공", content = @Content(schema = @Schema(implementation = URL.class))),
            @ApiResponse(responseCode = "400", description = "잘못된 요청"),
            @ApiResponse(responseCode = "500", description = "S3 파일 업로드 중 오류 발생")
    })
    public URL uploadFile(@PathVariable String folderName, @RequestParam MultipartFile file) throws Exception {
        return s3Service.uploadFile(folderName, file);
    }

    @DeleteMapping("/delete/{folderName}/{fileName}")
    @Operation(summary = "파일 삭제", description = "파일을 삭제합니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "파일 삭제 성공"),
            @ApiResponse(responseCode = "500", description = "S3 파일 삭제 중 오류 발생")
    })
    public ResponseEntity<String> deleteFile(@PathVariable String folderName, @PathVariable String fileName) {
        s3Service.deleteFile(folderName, fileName);
        return ResponseEntity.ok("파일이 삭제 되었습니다.");
    }

    @GetMapping("/url/{folderName}/{fileName}")
    @Operation(summary = "파일 URL 가져오기", description = "파일의 URL을 가져옵니다.")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "URL 가져오기 성공", content = @Content(schema = @Schema(implementation = URL.class))),
            @ApiResponse(responseCode = "500", description = "S3에서 파일 URL 검색 중 오류 발생")
    })
    public ResponseEntity<URL> getFileUrl(@PathVariable String folderName, @PathVariable String fileName) {
        URL url = s3Service.getFileUrl(folderName, fileName);
        return ResponseEntity.ok(url);
    }

}