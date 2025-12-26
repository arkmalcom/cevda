package apperrors

type ValidationError struct {
	Field   string
	Message string
}

type ValidationErrors map[string]FieldError

func (e *ValidationError) Error() string {
	return e.Message
}

func (v ValidationErrors) Error() string {
	return "validation error"
}

type FieldError struct {
	Code  ErrorType `json:"code"`
	Field string    `json:"field"`
}

type ErrorType string

const (
	FieldRequired ErrorType = "required"
	FieldInvalid  ErrorType = "invalid"
)
