package global

import (
	"bytes"
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"net/url"
	"os"
	"strconv"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"golang.org/x/crypto/bcrypt"
)

const AWSBucket = "swish-demo-customer-pfps"
const CustomerProfilePicKey = "customer-profile-pics"

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

type aWSCredentials struct {
	AccessKeyID     string
	SecretAccessKey string
}

func loadAWSCredentials() (*aWSCredentials, error) {
	// Open the CSV file
	file, err := os.Open("credentials.csv")
	if err != nil {
		return nil, fmt.Errorf("failed to open CSV file: %v", err)
	}
	defer file.Close()

	// Parse the CSV file
	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		return nil, fmt.Errorf("failed to parse CSV file: %v", err)
	}

	// Check if the CSV has the expected structure
	if len(records) < 2 || len(records[1]) < 2 {
		return nil, fmt.Errorf("unexpected CSV format")
	}

	// Extract the credentials
	credentials := &aWSCredentials{
		AccessKeyID:     records[1][0], // "Access Key ID" is in the second column
		SecretAccessKey: records[1][1], // "Secret Access Key" is in the third column
	}

	return credentials, nil
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

	creds, err := loadAWSCredentials()
	if err != nil {
		return "", err
	}

	// Start a session with AWS
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"),
		Credentials: credentials.NewStaticCredentials(
			creds.AccessKeyID, creds.SecretAccessKey, "",
		),
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

type NominatimResponse []struct {
	Lat string `json:"lat"`
	Lon string `json:"lon"`
}

func GetCoordinatesFromAddress(address string) (float64, float64, error) {
	baseURL := "https://nominatim.openstreetmap.org/search"
	endpoint := fmt.Sprintf("%s?q=%s&format=json&addressdetails=1", baseURL, url.QueryEscape(address))

	resp, err := http.Get(endpoint)
	if err != nil {
		return 0, 0, fmt.Errorf("failed to make request to Nominatim: %w", err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	var result NominatimResponse
	err = json.Unmarshal(body, &result)
	if err != nil {
		return 0, 0, fmt.Errorf("failed to decode Nominatim response: %w", err)
	}

	if len(result) == 0 {
		return 0, 0, fmt.Errorf("404")
	}

	var lat, lon float64
	lat, err = strconv.ParseFloat(result[0].Lat, 64)
	if err != nil {
		return 0, 0, fmt.Errorf("failed to parse latitude: %w", err)
	}

	lon, err = strconv.ParseFloat(result[0].Lon, 64)
	if err != nil {
		return 0, 0, fmt.Errorf("failed to parse longitude: %w", err)
	}

	return lat, lon, nil
}
