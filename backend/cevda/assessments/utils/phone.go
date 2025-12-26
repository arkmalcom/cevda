package utils

import (
	"errors"

	"github.com/nyaruka/phonenumbers"
)

func NormalizePhone(raw string) (string, error) {
	num, err := phonenumbers.Parse(raw, "DO")
	if err != nil {
		return "", err
	}

	if !phonenumbers.IsValidNumber(num) {
		return "", errors.New("invalid phone number")
	}

	return phonenumbers.Format(num, phonenumbers.E164), nil
}
