package repository

import (
	"cevda/assessments/models"
	"context"
	"errors"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/feature/dynamodb/attributevalue"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
)

type dynamoAssessmentQuestion struct {
	QuestionID   string   `dynamodbav:"question_id"`
	Prompt       string   `dynamodbav:"prompt"`
	Choices      []string `dynamodbav:"choices"`
	CorrectIndex int      `dynamodbav:"correct_index"`
	Tags         []string `dynamodbav:"tags,omitempty"`
}

type dynamoQuestionRepository struct {
	client    *dynamodb.Client
	tableName string
}

func fromDynamoQuestion(d *dynamoAssessmentQuestion) *models.AssessmentQuestion {
	return &models.AssessmentQuestion{
		QuestionID:   d.QuestionID,
		Prompt:       d.Prompt,
		Choices:      d.Choices,
		CorrectIndex: d.CorrectIndex,
		Tags:         d.Tags,
	}
}

func toDynamoQuestion(q *models.AssessmentQuestion) *dynamoAssessmentQuestion {
	return &dynamoAssessmentQuestion{
		QuestionID:   q.QuestionID,
		Prompt:       q.Prompt,
		Choices:      q.Choices,
		CorrectIndex: q.CorrectIndex,
		Tags:         q.Tags,
	}
}

func (r *dynamoQuestionRepository) PutIfNotExists(ctx context.Context, question *models.AssessmentQuestion) error {
	item := toDynamoQuestion(question)

	av, err := attributevalue.MarshalMap(item)
	if err != nil {
		return err
	}

	_, err = r.client.PutItem(ctx, &dynamodb.PutItemInput{
		TableName:           &r.tableName,
		Item:                av,
		ConditionExpression: aws.String("attribute_not_exists(question_id)"),
	})

	var condErr *types.ConditionalCheckFailedException

	if errors.As(err, &condErr) {
		return nil
	}

	return err
}

func (r *dynamoQuestionRepository) BatchGetById(ctx context.Context, ids []string) ([]*models.AssessmentQuestion, error) {
	keys := make([]map[string]types.AttributeValue, 0, len(ids))

	for _, id := range ids {
		keys = append(keys, map[string]types.AttributeValue{
			"question_id": &types.AttributeValueMemberS{Value: id},
		})
	}

	output, err := r.client.BatchGetItem(ctx, &dynamodb.BatchGetItemInput{
		RequestItems: map[string]types.KeysAndAttributes{
			r.tableName: {
				Keys: keys,
			},
		},
	})

	if err != nil {
		return nil, err
	}

	items := output.Responses[r.tableName]
	questions := make([]*models.AssessmentQuestion, 0, len(items))

	for _, item := range items {
		var dq dynamoAssessmentQuestion
		err = attributevalue.UnmarshalMap(item, &dq)
		if err != nil {
			return nil, err
		}
		questions = append(questions, fromDynamoQuestion(&dq))
	}

	return questions, nil
}

func NewQuestionRepository(client *dynamodb.Client, tableName string) QuestionRepository {
	return &dynamoQuestionRepository{
		client:    client,
		tableName: tableName,
	}
}
