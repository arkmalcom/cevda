package handlers

import (
	"encoding/json"
	"net/http"

	"cevda/assessments/models"
)

func (h *Handler) getQuestions(w http.ResponseWriter, r *http.Request) {
	var req struct {
		QuestionIDs []string `json:"question_ids"`
	}

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	questions, err := h.Questions.BatchGetById(r.Context(), req.QuestionIDs)
	if err != nil {
		http.Error(w, "Failed to get questions", http.StatusInternalServerError)
		return
	}

	public := make([]*models.PublicAssessmentQuestion, 0, len(questions))
	for _, q := range questions {
		public = append(public, models.ToPublicQuestion(q))
	}

	writeJSON(w, http.StatusOK, public)
}
