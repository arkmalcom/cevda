package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"cevda/assessments/dynamodb"
	"cevda/assessments/handlers"
	"cevda/assessments/middleware"
	"cevda/assessments/repository"
	"cevda/assessments/services"
)

func main() {
	ctx := context.Background()
	log.Println("Starting server on :8080")

	dynamodb.Init()
	dynamodb.CreateTablesIfLocal(ctx)

	attemptTableName := os.Getenv("ATTEMPTS_TABLE_NAME")
	attemptRepo := repository.NewAttemptRepository(dynamodb.Client, attemptTableName)
	assessmentSvc := services.NewAssessmentService(attemptRepo)

	h := &handlers.Handler{
		Attempts:          attemptRepo,
		AssessmentService: *assessmentSvc,
	}

	log.Println("Registering routes...")

	allowedOrigins := []string{
		"http://localhost:5173",
		os.Getenv("BASE_SITE_URL"),
	}
	mux := http.NewServeMux()
	h.RegisterRoutes(mux)

	log.Println("Listening on :8080")

	log.Fatal(http.ListenAndServe(":8080", middleware.WithCORS(allowedOrigins, mux)))
}
