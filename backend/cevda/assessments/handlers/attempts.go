package handlers

import (
	"cevda/assessments/apperrors"
	"cevda/assessments/models"
	"encoding/json"
	"errors"
	"log"
	"net/http"
)

func (h *Handler) startAttempt(w http.ResponseWriter, r *http.Request) {
	var req struct {
		Email string `json:"email"`
		Name  string `json:"name"`
		Phone string `json:"phone"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	attempt, err := h.AssessmentService.CreateAssessmentAttempt(r.Context(), req.Email, req.Name, req.Phone)
	if err != nil {
		var verrs apperrors.ValidationErrors
		if errors.As(err, &verrs) {
			writeJSON(w, http.StatusBadRequest, map[string]interface{}{
				"errors": verrs,
			})
			return
		}

		log.Printf("Error creating attempt: %v", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	if err := h.Attempts.Create(r.Context(), attempt); err != nil {
		http.Error(w, "Failed to save attempt", http.StatusInternalServerError)
		return
	}

	writeJSON(w, http.StatusCreated, attempt)
}

func (h *Handler) submitAttempt(w http.ResponseWriter, r *http.Request) {
	var req struct {
		AttemptID string         `json:"attempt_id"`
		Answers   map[string]int `json:"answers"`
		CreatedAt int            `json:"created_at"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	score, err := h.AssessmentService.GradeAttempt(
		r.Context(),
		req.AttemptID,
		req.Answers,
	)

	if err != nil {
		http.Error(w, "Failed to grade attempt", http.StatusInternalServerError)
		return
	}

	log.Printf("Updating attempt %s with score %d", req.AttemptID, score)
	log.Printf("Answers: %+v", req.Answers)

	err = h.Attempts.Update(
		r.Context(),
		req.AttemptID,
		req.Answers,
		req.CreatedAt,
		models.StatusCompleted.String(),
		&score,
	)

	if err != nil {
		http.Error(w, "Failed to update attempt", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]int{"score": score})
}
