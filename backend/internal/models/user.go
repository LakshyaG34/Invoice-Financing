package models

import "github.com/google/uuid"

type User struct {
	ID             uuid.UUID `json:"id"`
	OrganizationID uuid.UUID `json:"organization_id"`

	FullName string `json:"full_name"`
	Email    string `json:"email"`

	PasswordHash string `json:"-"`

	Role string `json:"role"`
}