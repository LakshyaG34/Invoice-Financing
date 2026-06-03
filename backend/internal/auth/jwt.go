package auth

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateToken(
	userID string,
	email string,
	role string,
) (string, error) {

	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		jwt.MapClaims{
			"userId": userID,
			"email":  email,
			"role":   role,
			"exp":    time.Now().Add(24 * time.Hour).Unix(),
		},
	)

	return token.SignedString(
		[]byte(os.Getenv("JWT_SECRET")),
	)
}