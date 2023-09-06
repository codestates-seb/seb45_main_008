package com.stockholm.main_project.awss3;

import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.core.sync.RequestBody;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.net.URL;

@Service
public class AwsS3Service {

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    private S3Client s3Client;

    @PostConstruct
    public void initializeS3Client() {
        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(accessKey, secretKey);

        this.s3Client = S3Client.builder()
                .region(Region.AP_NORTHEAST_2)
                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                .build();
    }

    // 이미지 업로드
    public URL uploadFile(MultipartFile file) throws Exception {
        String fileName = "Picture/" + file.getOriginalFilename();

        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .contentType("image/jpeg")  // 이 부분을 추가
                .build();

        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fileName));
    }

    // 이미지 삭제
    public void deleteFile(String fileName) {
        String fullFileName = "Picture/" + fileName;
        s3Client.deleteObject(builder -> builder.bucket(bucketName).key(fullFileName));
    }

    // 이미지 URL 가져오기
    public URL getFileUrl(String fileName) {
        String fullFileName = "Picture/" + fileName;
        return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fullFileName));
    }
}