package services

import (
	"bytes"
	"context"
	"fmt"
	"log"
	"mime/multipart"
	"salesforce/config"
	"time"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
)

// UploadFileToS3 uploads a file to AWS S3 and returns the file URL
func UploadFileToS3(file multipart.File, fileName string) (string, error) {
	// Define the key (path) where the file will be stored in S3
	key := fmt.Sprintf("contracts/%d_%s", time.Now().Unix(), fileName)

	// Read file content into a buffer
	var fileBuffer bytes.Buffer
	_, err := fileBuffer.ReadFrom(file)
	if err != nil {
		log.Println("Error reading file:", err)
		return "", err
	}

	// Upload file to S3
	_, err = config.S3Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket:      &config.BucketName,
		Key:         &key,
		Body:        bytes.NewReader(fileBuffer.Bytes()),
		ContentType: nil,
		ACL:         types.ObjectCannedACLPublicRead, // Set file to be publicly accessible
	})

	if err != nil {
		log.Println("Error uploading to S3:", err)
		return "", err
	}

	// Return file URL
	fileURL := fmt.Sprintf("https://%s.s3.amazonaws.com/%s", config.BucketName, key)
	return fileURL, nil
}
