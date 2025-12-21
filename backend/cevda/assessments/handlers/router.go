package handlers

import (
	"cevda/assessments/repository"
	"cevda/assessments/services"
	"net/http"
)

type Handler struct {
	Attempts          repository.AttemptRepository
	Questions         repository.QuestionRepository
	AssessmentService services.AssessmentService
}

func New(
	attempts repository.AttemptRepository,
	questions repository.QuestionRepository,
) *Handler {
	return &Handler{
		Attempts:  attempts,
		Questions: questions,
	}
}

func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	// Health routes
	mux.HandleFunc("GET /health", h.healthCheck)
	// Attempt routes
	mux.HandleFunc("POST /attempts/start", h.startAttempt)
	mux.HandleFunc("POST /attempts/submit", h.submitAttempt)
	// Question routes
	mux.HandleFunc("GET /questions", h.getQuestions)
}
