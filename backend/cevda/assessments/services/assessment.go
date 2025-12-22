package services

import (
	"context"
	"errors"
	"math/rand"
	"os"
	"strconv"
	"time"

	"cevda/assessments/data"
	"cevda/assessments/models"
	"cevda/assessments/repository"

	"github.com/google/uuid"
)

const defaultAttemptTTLSeconds int64 = 3600 // 1 hour
const defaultCategoryCount = 5

type AssessmentService struct {
	attempts repository.AttemptRepository
}

func NewAssessmentService(attempts repository.AttemptRepository) *AssessmentService {
	return &AssessmentService{
		attempts: attempts,
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

	totalScore := 0
	for _, qID := range attempt.QuestionIDs {
		if question, ok := data.AllByID[qID]; ok {
			if answer, exists := answers[qID]; exists && answer == question.CorrectIndex {
				totalScore++
			}
		}
	}

	if len(attempt.QuestionIDs) == 0 {
		return 0, nil
	}

	percentageScore := (totalScore * 100) / len(attempt.QuestionIDs)
	return percentageScore, nil
}

func (s *AssessmentService) GetRandomQuestions(
	ctx context.Context,
	categoryCount int,
) ([]*models.PublicAssessmentQuestion, error) {
	catMap := make(map[string][]models.AssessmentQuestion)
	for _, q := range data.All {
		for _, tag := range q.Tags {
			catMap[tag] = append(catMap[tag], q)
		}
	}

	rand.New(rand.NewSource(time.Now().UnixNano()))
	selected := make([]*models.PublicAssessmentQuestion, 0)

	for _, questions := range catMap {
		n := categoryCount
		if len(questions) < n {
			n = len(questions)
		}

		perm := rand.Perm(len(questions))
		for i := 0; i < n; i++ {
			selected = append(selected, models.ToPublicQuestion(&questions[perm[i]]))
		}
	}

	return selected, nil
}

func (s *AssessmentService) CreateAssessmentAttempt(ctx context.Context, email string) (*models.AssessmentAttempt, error) {
	if email == "" {
		return nil, errors.New("Email is required.")
	}

	now := time.Now().Unix()

	ttlSeconds := defaultAttemptTTLSeconds

	if expirationTime := os.Getenv("ATTEMPT_EXPIRATION_SECONDS"); expirationTime != "" {
		parsed, err := strconv.ParseInt(expirationTime, 10, 64)
		if err == nil {
			ttlSeconds = parsed
		}
	}

	categoryCount := defaultCategoryCount

	if categoryCountEnv := os.Getenv("QUESTIONS_CATEGORY_COUNT"); categoryCountEnv != "" {
		parsed, err := strconv.Atoi(categoryCountEnv)
		if err == nil {
			categoryCount = parsed
		}
	}

	selected, err := s.GetRandomQuestions(context.Background(), categoryCount)
	if err != nil {
		return nil, err
	}

	selectedIds := make([]string, 0, len(selected))
	for _, q := range selected {
		selectedIds = append(selectedIds, q.QuestionID)
	}

	attempt := &models.AssessmentAttempt{
		AttemptID:        uuid.New(),
		CreatedAt:        now,
		ExpiresAt:        now + ttlSeconds,
		Email:            email,
		QuestionIDs:      selectedIds,
		Answers:          make(map[string]int),
		AssessmentStatus: models.StatusInProgress,
	}

	if err := s.attempts.Create(ctx, attempt); err != nil {
		return nil, err
	}

	return attempt, nil
}
