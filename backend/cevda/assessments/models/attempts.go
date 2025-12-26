package models

import (
	"errors"

	"github.com/google/uuid"
)

type StatusType string

type AssessmentAttempt struct {
	AttemptID        uuid.UUID
	CreatedAt        int64
	ExpiresAt        int64
	Email            string
	Name             string
	Phone            string
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
