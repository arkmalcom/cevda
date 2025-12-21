package repository

import (
	"cevda/assessments/models"

	"github.com/google/uuid"
)

type dynamoAssessmentAttempt struct {
	AttemptID   string         `dynamodbav:"attempt_id"`
	CreatedAt   int64          `dynamodbav:"created_at"`
	ExpiresAt   int64          `dynamodbav:"expires_at"`
	Email       string         `dynamodbav:"email"`
	QuestionIDs []string       `dynamodbav:"question_ids"`
	Answers     map[string]int `dynamodbav:"answers"`
	Score       *int           `dynamodbav:"score,omitempty"`
	Status      string         `dynamodbav:"status"`
}

func fromDynamoAttempt(d *dynamoAssessmentAttempt) *models.AssessmentAttempt {
	id, _ := uuid.Parse(d.AttemptID)

	return &models.AssessmentAttempt{
		AttemptID:   id,
		CreatedAt:   d.CreatedAt,
		ExpiresAt:   d.ExpiresAt,
		Email:       d.Email,
		QuestionIDs: d.QuestionIDs,
		Answers:     d.Answers,
		Score:       d.Score,
		Status:      d.Status,
	}
}

func toDynamoAttempt(a *models.AssessmentAttempt) *dynamoAssessmentAttempt {
	return &dynamoAssessmentAttempt{
		AttemptID:   a.AttemptID.String(),
		CreatedAt:   a.CreatedAt,
		ExpiresAt:   a.ExpiresAt,
		Email:       a.Email,
		QuestionIDs: a.QuestionIDs,
		Answers:     a.Answers,
		Score:       a.Score,
		Status:      a.Status,
	}
}
