package repository

import (
	"context"

	"cevda/assessments/models"
)

type QuestionRepository interface {
	PutIfNotExists(ctx context.Context, question *models.AssessmentQuestion) error
	BatchGetById(ctx context.Context, ids []string) ([]*models.AssessmentQuestion, error)
}
