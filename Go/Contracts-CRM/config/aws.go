package config

import (
	"context"
	"log"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

// AWS S3 Configuration
var S3Client *s3.Client
var BucketName = "your-bucket-name"

func InitS3() {
	// Load AWS configuration
	cfg, err := config.LoadDefaultConfig(context.TODO())
	if err != nil {
		log.Fatal("Failed to load AWS config:", err)
	}

	S3Client = s3.NewFromConfig(cfg)
	log.Println("✅ AWS S3 Initialized Successfully")
}
