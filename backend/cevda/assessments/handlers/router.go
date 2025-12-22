package handlers

import (
	"cevda/assessments/repository"
	"cevda/assessments/services"
	"net/http"
)

type Handler struct {
	Attempts          repository.AttemptRepository
	AssessmentService services.AssessmentService
}

func New(
	attempts repository.AttemptRepository,
	svc services.AssessmentService,
) *Handler {
	return &Handler{
		Attempts:          attempts,
		AssessmentService: svc,
	}
}

func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
	// Health routes
	mux.HandleFunc("GET /health", h.healthCheck)
	// Attempt routes
	mux.HandleFunc("POST /attempts/start", h.startAttempt)
	mux.HandleFunc("POST /attempts/submit", h.submitAttempt)
	// Question routes
	mux.HandleFunc("GET /questions/{attempt_id}", h.getQuestionsForAttempt)
}
