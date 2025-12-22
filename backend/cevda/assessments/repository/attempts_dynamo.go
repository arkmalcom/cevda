package repository

import (
	"cevda/assessments/models"
	"context"
	"errors"
	"log"
	"strconv"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/google/uuid"
)

type dynamoAssessmentAttempt struct {
	AttemptID        string         `dynamodbav:"attempt_id"`
	CreatedAt        int64          `dynamodbav:"created_at"`
	ExpiresAt        int64          `dynamodbav:"expires_at"`
	Email            string         `dynamodbav:"email"`
	QuestionIDs      []string       `dynamodbav:"question_ids"`
	Answers          map[string]int `dynamodbav:"answers"`
	Score            *int           `dynamodbav:"score,omitempty"`
	AssessmentStatus string         `dynamodbav:"status"`
}

type dynamoAttemptRepository struct {
	client    *dynamodb.Client
	tableName string
}

func fromDynamoAttempt(d *dynamoAssessmentAttempt) *models.AssessmentAttempt {
	id, err := uuid.Parse(d.AttemptID)
	if err != nil {
		return nil
	}

	status, err := models.ParseStatusType(d.AssessmentStatus)
	if err != nil {
		return nil
	}

	return &models.AssessmentAttempt{
		AttemptID:        id,
		CreatedAt:        d.CreatedAt,
		ExpiresAt:        d.ExpiresAt,
		Email:            d.Email,
		QuestionIDs:      d.QuestionIDs,
		Answers:          d.Answers,
		Score:            d.Score,
		AssessmentStatus: status,
	}
}

func toDynamoAttempt(a *models.AssessmentAttempt) *dynamoAssessmentAttempt {
	return &dynamoAssessmentAttempt{
		AttemptID:        a.AttemptID.String(),
		CreatedAt:        a.CreatedAt,
		ExpiresAt:        a.ExpiresAt,
		Email:            a.Email,
		QuestionIDs:      a.QuestionIDs,
		Answers:          a.Answers,
		Score:            a.Score,
		AssessmentStatus: a.AssessmentStatus.String(),
	}
}

func (r *dynamoAttemptRepository) Create(ctx context.Context, attempt *models.AssessmentAttempt) error {
	log.Printf("Creating attempt with ID %s", attempt.AttemptID.String())
	item := toDynamoAttempt(attempt)
	av, err := attributevalue.MarshalMap(item)

	if err != nil {
		return err
	}

	_, err = r.client.PutItem(ctx, &dynamodb.PutItemInput{
		TableName: &r.tableName,
		Item:      av,
	})

	return err
}

func (r *dynamoAttemptRepository) GetByID(ctx context.Context, attemptID string) (*models.AssessmentAttempt, error) {
	_, err := uuid.Parse(attemptID)
	if err != nil {
		return nil, err
	}

	log.Printf("Getting attempt with ID %s", attemptID)

	result, err := r.client.Query(ctx, &dynamodb.QueryInput{
		TableName:              &r.tableName,
		KeyConditionExpression: aws.String("attempt_id = :attempt_id"),
		ExpressionAttributeValues: map[string]types.AttributeValue{
			":attempt_id": &types.AttributeValueMemberS{Value: attemptID},
		},
	})

	log.Printf("DynamoDB GetItem result: %+v", result)

	if err != nil {
		return nil, err
	}

	if len(result.Items) == 0 {
		return nil, errors.New("Attempt not found.")
	}

	var item dynamoAssessmentAttempt
	if err := attributevalue.UnmarshalMap(result.Items[0], &item); err != nil {
		return nil, err
	}

	return fromDynamoAttempt(&item), nil
}

func marshalAnswers(answers map[string]int) map[string]types.AttributeValue {
	out := make(map[string]types.AttributeValue, len(answers))

	for k, v := range answers {
		out[k] = &types.AttributeValueMemberN{Value: strconv.Itoa(v)}
	}

	return out
}

func (r *dynamoAttemptRepository) Update(ctx context.Context, attemptID string, answers map[string]int, createdAt int, status string, score *int) error {
	log.Printf("Updating attempt with ID %s", attemptID)

	updateExpr := "SET answers = :answers, assessment_status = :status"
	values := map[string]types.AttributeValue{
		":answers": &types.AttributeValueMemberM{Value: marshalAnswers(answers)},
		":status":  &types.AttributeValueMemberS{Value: status},
	}

	if score != nil {
		updateExpr += ", score = :score"
		values[":score"] = &types.AttributeValueMemberN{Value: strconv.Itoa(*score)}
	}

	_, err := r.client.UpdateItem(ctx, &dynamodb.UpdateItemInput{
		TableName: &r.tableName,
		Key: map[string]types.AttributeValue{
			"attempt_id": &types.AttributeValueMemberS{Value: attemptID},
			"created_at": &types.AttributeValueMemberN{Value: strconv.Itoa(createdAt)},
		},
		UpdateExpression:          &updateExpr,
		ExpressionAttributeValues: values,
	})

	return err
}

func NewAttemptRepository(client *dynamodb.Client, tableName string) AttemptRepository {
	return &dynamoAttemptRepository{
		client:    client,
		tableName: tableName,
	}
}
