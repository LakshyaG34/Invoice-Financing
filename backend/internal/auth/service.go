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

	orgID, err := s.repo.CreateOrganization(
		ctx,
		req.OrganizationName,
	)

	if err != nil {
		return err
	}

	err = s.repo.CreateUser(
		ctx,
		orgID,
		req.FullName,
		req.Email,
		string(hashedPassword),
		"ADMIN",
	)

	if err != nil {
		return err
	}

	return nil
}