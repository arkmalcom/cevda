package dynamodb

import (
	"context"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
)

var Client *dynamodb.Client

func Init() {
	ctx := context.TODO()

	log.Println("Initializing DynamoDB client")

	aws_access_key := os.Getenv("AWS_ACCESS_KEY_ID")
	aws_secret_key := os.Getenv("AWS_SECRET_ACCESS_KEY")
	aws_session_token := os.Getenv("AWS_SESSION_TOKEN")

	cfg, err := config.LoadDefaultConfig(
		ctx,
		config.WithRegion(os.Getenv("AWS_REGION")),
		config.WithCredentialsProvider(
			credentials.NewStaticCredentialsProvider(aws_access_key, aws_secret_key, aws_session_token),
		),
	)

	if err != nil {
		log.Fatalf("unable to load SDK config, %v", err)
	}

	ClientOptions := []func(*dynamodb.Options){}

	if endpoint := os.Getenv("DYNAMODB_ENDPOINT"); endpoint != "" {
		ClientOptions = append(ClientOptions, func(o *dynamodb.Options) {
			o.BaseEndpoint = aws.String(endpoint)
		})
	}

	Client = dynamodb.NewFromConfig(cfg, ClientOptions...)

	log.Println("DynamoDB client initialized")
}
