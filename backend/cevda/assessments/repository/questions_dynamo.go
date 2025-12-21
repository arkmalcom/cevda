package repository

import "cevda/assessments/models"

type dynamoAssessmentQuestion struct {
	QuestionID   string   `dynamodbav:"question_id"`
	Prompt       string   `dynamodbav:"prompt"`
	Choices      []string `dynamodbav:"choices"`
	CorrectIndex int      `dynamodbav:"correct_index"`
	Tags         []string `dynamodbav:"tags,omitempty"`
}

func fromDynamoQuestion(d *dynamoAssessmentQuestion) *models.AssessmentQuestion {
	return &models.AssessmentQuestion{
		QuestionID:   d.QuestionID,
		Prompt:       d.Prompt,
		Choices:      d.Choices,
		CorrectIndex: d.CorrectIndex,
		Tags:         d.Tags,
	}
}

func toDynamoQuestion(q *models.AssessmentQuestion) *dynamoAssessmentQuestion {
	return &dynamoAssessmentQuestion{
		QuestionID:   q.QuestionID,
		Prompt:       q.Prompt,
		Choices:      q.Choices,
		CorrectIndex: q.CorrectIndex,
		Tags:         q.Tags,
	}
}
