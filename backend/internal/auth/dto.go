package auth

type RegisterRequest struct {
	OrganizationName string `json:"organizationName" binding:"required"`
	FullName         string `json:"fullName" binding:"required"`
	Email            string `json:"email" binding:"required,email"`
	Password         string `json:"password" binding:"required,min=8"`
}