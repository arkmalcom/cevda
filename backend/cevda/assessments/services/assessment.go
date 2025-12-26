package services

import (
	"context"
	"math/rand"
	"os"
	"strconv"
	"time"

	"cevda/assessments/apperrors"
	"cevda/assessments/data"
	"cevda/assessments/models"
	"cevda/assessments/repository"
	"cevda/assessments/utils"

	"github.com/google/uuid"
)

const defaultAttemptTTLSeconds int64 = 30 // 15 minutes
const defaultCategoryCount = 5

type AssessmentService struct {
	attempts repository.AttemptRepository
}

type QuestionResult struct {
	QuestionID string `json:"question_id"`
	Correct    bool   `json:"correct"`
	Answered   bool   `json:"answered"`
}

type GradeResult struct {
	Score          int              `json:"score"`
	TotalQuestions int              `json:"total_questions"`
	Results        []QuestionResult `json:"results"`
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
) (*GradeResult, error) {
	attempt, err := s.attempts.GetByID(ctx, attemptID)
	if err != nil {
		return nil, err
	}

	if attempt.AssessmentStatus == models.StatusCompleted {
		return nil, nil
	}

	results := make([]QuestionResult, 0, len(attempt.QuestionIDs))
	totalScore := 0
	for _, qID := range attempt.QuestionIDs {
		question, ok := data.AllByID[qID]
		if !ok {
			continue
		}

		answer := answers[qID]
		answered := answer >= 0 && answer < len(question.Choices)
		correct := answered && answer == question.CorrectIndex
		if correct {
			totalScore++
		}

		results = append(results, QuestionResult{
			QuestionID: qID,
			Correct:    correct,
			Answered:   answered,
		})
	}

	percentageScore := 0
	if len(attempt.QuestionIDs) != 0 {
		percentageScore = (totalScore * 100) / len(attempt.QuestionIDs)
	}

	return &GradeResult{
		Score:          percentageScore,
		TotalQuestions: len(attempt.QuestionIDs),
		Results:        results,
	}, nil
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
	seen := make(map[string]struct{})

	for _, questions := range catMap {
		n := categoryCount
		if len(questions) < n {
			n = len(questions)
		}

		perm := rand.Perm(len(questions))
		for i := 0; i < n; i++ {
			q := &questions[perm[i]]
			if _, exists := seen[q.QuestionID]; exists {
				continue
			}

			seen[q.QuestionID] = struct{}{}
			selected = append(selected, models.ToPublicQuestion(q))
			n--
		}
	}

	return selected, nil
}

func (s *AssessmentService) CreateAssessmentAttempt(ctx context.Context, email string, name string, phone string) (*models.AssessmentAttempt, error) {
	errs := apperrors.ValidationErrors{}
	if email == "" {
		errs["email"] = apperrors.FieldError{
			Code:  apperrors.FieldRequired,
			Field: "email",
		}
	}

	if name == "" {
		errs["name"] = apperrors.FieldError{
			Code:  apperrors.FieldRequired,
			Field: "name",
		}
	}

	if phone == "" {
		errs["phone"] = apperrors.FieldError{
			Code:  apperrors.FieldRequired,
			Field: "phone",
		}
	}

	if len(errs) > 0 {
		return nil, errs
	}

	normalizedPhone, err := utils.NormalizePhone(phone)
	if err != nil {
		errs["phone"] = apperrors.FieldError{
			Code:  apperrors.FieldInvalid,
			Field: "phone",
		}
		return nil, errs
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
		Name:             name,
		Phone:            normalizedPhone,
		QuestionIDs:      selectedIds,
		Answers:          make(map[string]int),
		AssessmentStatus: models.StatusInProgress,
	}

	if err := s.attempts.Create(ctx, attempt); err != nil {
		return nil, err
	}

	return attempt, nil
}
