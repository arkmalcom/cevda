package dynamodb

import (
	"context"
	"errors"
	"log"
	"os"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

func CreateTablesIfLocal(ctx context.Context) {
	isLocal := os.Getenv("IS_LOCAL")
	if isLocal == "" {
		isLocal = "false"
	}

	if isLocal == "false" {
		return
	}

	log.Println("Creating DynamoDB tables in local environment...")
	createAttemptsTable(ctx)
}

func createTableBase(ctx context.Context, tableName string, keySchema []types.KeySchemaElement, attributeDefinitions []types.AttributeDefinition) {
	log.Printf("Creating table %s...", tableName)

	_, err := Client.CreateTable(ctx, &dynamodb.CreateTableInput{
		TableName:            aws.String(tableName),
		KeySchema:            keySchema,
		AttributeDefinitions: attributeDefinitions,
		BillingMode:          types.BillingModePayPerRequest,
	})

	if err != nil {
		var exists *types.ResourceInUseException
		if errors.As(err, &exists) {
			log.Printf("Table %s already exists", tableName)
			return
		}
		log.Fatalf("Failed to create table %s: %v", tableName, err)
	}

	log.Printf("Created table %s", tableName)
}

func createAttemptsTable(ctx context.Context) {
	createTableBase(ctx,
		os.Getenv("ATTEMPTS_TABLE_NAME"),
		[]types.KeySchemaElement{
			{
				AttributeName: aws.String("attempt_id"),
				KeyType:       types.KeyTypeHash,
			},
			{
				AttributeName: aws.String("created_at"),
				KeyType:       types.KeyTypeRange,
			},
		},
		[]types.AttributeDefinition{
			{
				AttributeName: aws.String("attempt_id"),
				AttributeType: types.ScalarAttributeTypeS,
			},
			{
				AttributeName: aws.String("created_at"),
				AttributeType: types.ScalarAttributeTypeN,
			},
		},
	)
}
