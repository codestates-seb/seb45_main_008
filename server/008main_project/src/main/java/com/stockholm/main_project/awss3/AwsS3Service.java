package com.stockholm.main_project.awss3;


import org.springframework.stereotype.Service;
import com.stockholm.main_project.exception.BusinessLogicException;
import com.stockholm.main_project.exception.ExceptionCode;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;
import software.amazon.awssdk.core.sync.RequestBody;

import java.net.URL;

@Service
public class AwsS3Service {

    private final String bucketName = "stockholm-server";
    private final S3Client s3Client;

    public AwsS3Service() {
        try {
            String awsAccessKeyId = System.getenv("AWS_ACCESS_KEY_ID");
            String awsSecretAccessKey = System.getenv("AWS_SECRET_ACCESS_KEY");

            AwsBasicCredentials awsCredentials = AwsBasicCredentials.create(
                    awsAccessKeyId,
                    awsSecretAccessKey
            );

            this.s3Client = S3Client.builder()
                    .region(Region.AP_NORTHEAST_2)
                    .credentialsProvider(StaticCredentialsProvider.create(awsCredentials))
                    .build();
        } catch (Exception e) {
            throw new BusinessLogicException(ExceptionCode.AWS_CREDENTIALS_ERROR);
        }
    }
        public URL uploadFile(String folderName, MultipartFile file) throws Exception {
            try {
                String fileName = folderName + "/" + file.getOriginalFilename();

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

        public void deleteFile(String folderName, String fileName) {
            try {
                String fullFileName = folderName + "/" + fileName;
                s3Client.deleteObject(builder -> builder.bucket(bucketName).key(fullFileName));
            } catch (Exception e) {
                throw new BusinessLogicException(ExceptionCode.S3_DELETE_ERROR);
            }
        }

        public URL getFileUrl(String folderName, String fileName) {
            try {
                String fullFileName = folderName + "/" + fileName;
                return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(fullFileName));
            } catch (Exception e) {
                throw new BusinessLogicException(ExceptionCode.S3_URL_RETRIEVE_ERROR);
            }
        }
    }