package com.stockholm.main_project.awss3;

import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.core.sync.RequestBody;

import java.net.URL;
import java.nio.file.Path;
import java.util.UUID;

@Service
public class AwsS3Service {

    private final String bucketName = "stockholm-server";
    private final S3Client s3Client;

    public AwsS3Service() {
        try {
            AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(
                    "",
                    ""
            );

            this.s3Client = S3Client.builder()
                    .region(Region.AP_NORTHEAST_2)
                    .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                    .build();
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.AWS_CREDENTIALS_ERROR);
        }
    }

    public URL uploadFile(MultipartFile file) throws Exception {
        try {
            String dirName = "Picture";
            String fileName = dirName + "/" + file.getOriginalFilename();

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .contentType("image/jpeg")
                    .key(fileName)
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fileName));
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.S3_UPLOAD_ERROR);
        }
    }

    public void deleteFile(String fileName) {
        try {
            String dirName = "Picture";
            String fullFileName = dirName + "/" + fileName;
            s3Client.deleteObject(builder -> builder.bucket(bucketName).key(fullFileName));
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.S3_DELETE_ERROR);
        }
    }

    public URL getFileUrl(String fileName) {
        try {
            String dirName = "Picture";
            String fullFileName = dirName + "/" + fileName;
            return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fullFileName));
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.S3_URL_RETRIEVE_ERROR);
        }
    }
}

//public class AwsS3Service {
//
//    private final String bucketName = "stockholm-server";
//    private final S3Client s3Client;
//
//    public AwsS3Service() {
//        AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(
//                "",
//                ""
//        );
//
//        this.s3Client = S3Client.builder()
//                .region(Region.AP_NORTHEAST_2)
//                .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
//                .build();
//    }
//
//    // 이미지 업로드
//    public URL uploadFile(MultipartFile file) throws Exception {
//        String dirName = "Picture";  // 고정된 폴더명
//        String fileName = dirName + "/" + file.getOriginalFilename();
//
//        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
//                .bucket(bucketName)
//                .contentType("image/jpeg")
//                .key(fileName)
//                .build();
//
//        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));
//
//        return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fileName));
//    }
//
//    // 이미지 삭제
//    public void deleteFile(String fileName) {
//        String dirName = "Picture";  // 고정된 폴더명
//        String fullFileName = dirName + "/" + fileName;
//        s3Client.deleteObject(builder -> builder.bucket(bucketName).key(fullFileName));
//    }
//
//    // 이미지 URL 가져오기
//    public URL getFileUrl(String fileName) {
//        String dirName = "Picture";  // 고정된 폴더명
//        String fullFileName = dirName + "/" + fileName;
//        return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fullFileName));
//    }
//}