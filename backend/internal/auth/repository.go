package auth

import (
	"context"

	"github.com/jackc/pgx/v5/pgxpool"
)

type Repository struct {
	DB *pgxpool.Pool
}

type User struct {
	ID           string
	Email        string
	PasswordHash string
	Role         string
}

func NewRepository(db *pgxpool.Pool) *Repository {
	return &Repository{
		DB: db,
	}
}

func (r *Repository) CreateOrganization(
	ctx context.Context,
	name string,
) (string, error) {

	var id string

	err := r.DB.QueryRow(
		ctx,
		`
		INSERT INTO organizations(name)
		VALUES($1)
		RETURNING id
		`,
		name,
	).Scan(&id)

	return id, err
}

func (r *Repository) EmailExists(
	ctx context.Context,
	email string,
) (bool, error) {

	var exists bool

	err := r.DB.QueryRow(
		ctx,
		`
		SELECT EXISTS(
			SELECT 1
			FROM users
			WHERE email = $1
		)
		`,
		email,
	).Scan(&exists)

	return exists, err
}

func (r *Repository) CreateUser(
	ctx context.Context,
	orgID string,
	fullName string,
	email string,
	passwordHash string,
	role string,
) error {

	_, err := r.DB.Exec(
		ctx,
		`
		INSERT INTO users(
			organization_id,
			full_name,
			email,
			password_hash,
			role
		)
		VALUES($1,$2,$3,$4,$5)
		`,
		orgID,
		fullName,
		email,
		passwordHash,
		role,
	)

	return err
}


func (r *Repository) GetUserByEmail(
	ctx context.Context,
	email string,
) (*User, error) {

	var user User

	err := r.DB.QueryRow(
		ctx,
		`
		SELECT
			id,
			email,
			password_hash,
			role
		FROM users
		WHERE email = $1
		`,
		email,
	).Scan(
		&user.ID,
		&user.Email,
		&user.PasswordHash,
		&user.Role,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func (r *Repository) RegisterOrganizationWithAdmin(
	ctx context.Context,
	orgName string,
	fullName string,
	email string,
	passwordHash string,
) error {

	tx, err := r.DB.Begin(ctx)

	if err != nil {
		return err
	}

	defer tx.Rollback(ctx)

	var orgID string

	err = tx.QueryRow(
		ctx,
		`
		INSERT INTO organizations(name)
		VALUES($1)
		RETURNING id
		`,
		orgName,
	).Scan(&orgID)

	if err != nil {
		return err
	}

	_, err = tx.Exec(
		ctx,
		`
		INSERT INTO users(
			organization_id,
			full_name,
			email,
			password_hash,
			role
		)
		VALUES($1,$2,$3,$4,$5)
		`,
		orgID,
		fullName,
		email,
		passwordHash,
		"ADMIN",
	)

	if err != nil {
		return err
	}

	return tx.Commit(ctx)
}