package auth

import (
	"context"
	"errors"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repo *Repository
}

func NewService(
	repo *Repository,
) *Service {

	return &Service{
		repo: repo,
	}
}

func (s *Service) Register(
	ctx context.Context,
	req RegisterRequest,
) error {

	exists, err := s.repo.EmailExists(
		ctx,
		req.Email,
	)

	if err != nil {
		return err
	}

	if exists {
		return errors.New("email already exists")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword(
		[]byte(req.Password),
		bcrypt.DefaultCost,
	)

	if err != nil {
		return err
	}

	return s.repo.RegisterOrganizationWithAdmin(
		ctx,
		req.OrganizationName,
		req.FullName,
		req.Email,
		string(hashedPassword),
	)
}

func (s *Service) Login(
	ctx context.Context,
	req LoginRequest,
) (string, error) {

	user, err := s.repo.GetUserByEmail(
		ctx,
		req.Email,
	)

	if err != nil {
		return "", errors.New("invalid credentials")
	}

	err = bcrypt.CompareHashAndPassword(
		[]byte(user.PasswordHash),
		[]byte(req.Password),
	)

	if err != nil {
		return "", errors.New("invalid credentials")
	}

	token, err := GenerateToken(
		user.ID,
		user.Email,
		user.Role,
	)

	if err != nil {
		return "", err
	}

	return token, nil
}
