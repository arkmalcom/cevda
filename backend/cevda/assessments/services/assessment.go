package services

import (
	"context"

	"cevda/assessments/models"
	"cevda/assessments/repository"
)

type AssessmentService struct {
	attempts  repository.AttemptRepository
	questions repository.QuestionRepository
}

func NewAssessmentService(attempts repository.AttemptRepository, questions repository.QuestionRepository) *AssessmentService {
	return &AssessmentService{
		attempts:  attempts,
		questions: questions,
	}
}

func (s *AssessmentService) GradeAttempt(
	ctx context.Context,
	attemptID string,
	answers map[string]int,
) (int, error) {
	attempt, err := s.attempts.GetByID(ctx, attemptID)
	if err != nil {
		return 0, err
	}

	if attempt.AssessmentStatus == models.StatusCompleted {
		return 0, nil
	}

	questions, err := s.questions.BatchGetById(ctx, attempt.QuestionIDs)
	if err != nil {
		return 0, err
	}

	totalScore := 0
	for _, question := range questions {
		if answer, ok := answers[question.QuestionID]; ok && answer == question.CorrectIndex {
			totalScore++
		}
	}

	// Convert to percentage out of 100
	percentageScore := (totalScore * 100) / len(questions)

	return percentageScore, nil
}
