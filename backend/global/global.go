package global

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"golang.org/x/crypto/bcrypt"
)

const CustomerProfilePicBucket = "swish-demo-customer-pfps"
const CustomerProfilePicKey = "customer-profile-pics"

const BusinessProfilePicBucket = "swish-demo-business-pfps"
const BusinessProfilePicKey = "business-profile-pics"

func HashPassword(password string) ([]byte, error) {

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)

	if err != nil {
		return []byte{}, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	if err != nil {
		return []byte{}, err
	}

	return hashedPassword, nil
}

// Function to upload the image to AWS S3
func UploadImageToS3(file *multipart.FileHeader, bucket string, key string) (string, error) {
	// Open the image file from frontend
	src, err := file.Open()
	if err != nil {
		return "", err
	}
	defer src.Close()

	// Read the image file content
	fileContent, err := io.ReadAll(src)
	if err != nil {
		return "", err
	}

	// Start a session with AWS
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("eu-north-1"),
	})
	if err != nil {
		return "", err
	}

	// Create an S3 service client
	svc := s3.New(sess)

	// Define S3 upload parameters
	uploadParams := &s3.PutObjectInput{
		Bucket:      aws.String(bucket),
		Key:         aws.String(key),
		Body:        bytes.NewReader(fileContent),
		ACL:         aws.String("public-read"),
		ContentType: aws.String("image/jpeg"),
	}

	// Upload the file to S3
	_, err = svc.PutObject(uploadParams)
	if err != nil {
		return "", err
	}

	// Return the URL of the uploaded image
	imageURL := fmt.Sprintf("https://%s.s3.amazonaws.com/%s", bucket, key)
	return imageURL, nil
}
