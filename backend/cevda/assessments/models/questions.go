package models

type AssessmentQuestion struct {
	QuestionID   string
	Prompt       string
	Choices      []string
	CorrectIndex int
	Tags         []string
}
