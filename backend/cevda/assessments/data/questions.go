package data

import (
	_ "embed"
	"encoding/json"
	"log"

	"cevda/assessments/models"
)

//go:embed questions.json
var raw []byte

var All []models.AssessmentQuestion
var AllByID map[string]models.AssessmentQuestion

func init() {
	if err := json.Unmarshal(raw, &All); err != nil {
		log.Fatalf("Failed to load questions data: %v", err)
	}

	AllByID = make(map[string]models.AssessmentQuestion, len(All))
	for _, q := range All {
		AllByID[q.QuestionID] = q
	}
}
