package handlers

import (
	"math/rand"
	"net/http"
	"time"

	"cevda/assessments/data"
	"cevda/assessments/models"
)

func (h *Handler) getQuestionsForAttempt(w http.ResponseWriter, r *http.Request) {
	attemptID := r.PathValue("attempt_id")
	if attemptID == "" {
		http.Error(w, "Missing attempt ID", http.StatusBadRequest)
		return
	}

	attempt, err := h.Attempts.GetByID(r.Context(), attemptID)
	if err != nil {
		http.Error(w, "Attempt not found", http.StatusNotFound)
		return
	}

	questions := make([]*models.PublicAssessmentQuestion, 0, len(attempt.QuestionIDs))
	for _, qID := range attempt.QuestionIDs {
		if question, ok := data.AllByID[qID]; ok {
			questions = append(questions, models.ToPublicQuestion(&question))
		}
	}

	// Shuffle questions to ensure random order
	rand.New(rand.NewSource(time.Now().UnixNano()))
	rand.Shuffle(len(questions), func(i, j int) {
		questions[i], questions[j] = questions[j], questions[i]
	})

	writeJSON(w, http.StatusOK, questions)
}
