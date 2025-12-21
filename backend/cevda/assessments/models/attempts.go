package models

import "github.com/google/uuid"

type AssessmentAttempt struct {
	AttemptID        uuid.UUID
	CreatedAt        int64
	ExpiresAt        int64
	Email            string
	QuestionIDs      []string
	Answers          map[string]int
	Score            *int
	AssessmentStatus string
}
