package models

type AssessmentQuestion struct {
	QuestionID   string
	Prompt       string
	Choices      []string
	CorrectIndex int
	Tags         []string
}

type PublicAssessmentQuestion struct {
	QuestionID string
	Prompt     string
	Choices    []string
	Tags       []string
}

func ToPublicQuestion(q *AssessmentQuestion) *PublicAssessmentQuestion {
	return &PublicAssessmentQuestion{
		QuestionID: q.QuestionID,
		Prompt:     q.Prompt,
		Choices:    q.Choices,
		Tags:       q.Tags,
	}
}
