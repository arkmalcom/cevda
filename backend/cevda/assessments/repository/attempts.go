package repository

import (
	"context"

	"cevda/assessments/models"
)

type AttemptRepository interface {
	Create(ctx context.Context, attempt *models.AssessmentAttempt) error
	GetByID(ctx context.Context, attemptID string) (*models.AssessmentAttempt, error)
	Update(ctx context.Context, attemptID string, answers map[string]int, createdAt int, status string, score *int) error
}
