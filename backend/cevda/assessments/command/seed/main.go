package main

import (
	"context"
	"encoding/json"
	"log"
	"os"

	"cevda/assessments/dynamodb"
	"cevda/assessments/models"
	"cevda/assessments/repository"
)

func main() {
	ctx := context.Background()
	dynamodb.Init()
	questionsTable := os.Getenv("QUESTIONS_TABLE")

	repo := repository.NewQuestionRepository(dynamodb.Client, questionsTable)

	data, err := os.ReadFile("data/questions.json")

	if err != nil {
		log.Fatal(err)
	}

	var questions []models.AssessmentQuestion

	if err := json.Unmarshal(data, &questions); err != nil {
		log.Fatal(err)
	}

	for _, question := range questions {
		if err := repo.PutIfNotExists(ctx, &question); err != nil {
			log.Fatalf("Failed to seed question %s: %v", question.QuestionID, err)
		}
	}

	log.Println("Seeding completed successfully")
}
