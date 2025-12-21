package models

import (
	"errors"
	"os"
	"strconv"
	"time"

	"github.com/google/uuid"
)

const defaultAttemptTTLSeconds int64 = 3600 // 1 hour

type StatusType string

type AssessmentAttempt struct {
	AttemptID        uuid.UUID
	CreatedAt        int64
	ExpiresAt        int64
	Email            string
	QuestionIDs      []string
	Answers          map[string]int
	Score            *int
	AssessmentStatus StatusType
}

const (
	StatusInProgress StatusType = "in_progress"
	StatusCompleted  StatusType = "completed"
)

func (s StatusType) String() string {
	return string(s)
}

func ParseStatusType(status string) (StatusType, error) {
	switch StatusType(status) {
	case StatusInProgress, StatusCompleted:
		return StatusType(status), nil
	default:
		return "", errors.New("invalid status type: " + status)
	}
}

func NewAssessmentAttempt(email string) (*AssessmentAttempt, error) {
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

	return &AssessmentAttempt{
		AttemptID:        uuid.New(),
		CreatedAt:        now,
		ExpiresAt:        now + ttlSeconds,
		Email:            email,
		QuestionIDs:      []string{},
		Answers:          make(map[string]int),
		AssessmentStatus: StatusInProgress,
	}, nil
}
