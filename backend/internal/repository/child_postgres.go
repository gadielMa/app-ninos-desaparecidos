package repository

import (
	"backend/internal/domain"
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type ChildPostgresRepository struct {
	db *pgx.Conn
}

func NewChildPostgresRepository(db *pgx.Conn) *ChildPostgresRepository {
	return &ChildPostgresRepository{db: db}
}

func (r *ChildPostgresRepository) Add(ctx context.Context, child *domain.Child) (*domain.Child, error) {
	id := child.ID()
	if id == "" {
		id = uuid.New().String()
	}
	_, err := r.db.Exec(ctx, `INSERT INTO children (id, full_name, age, birth_date, gender, description, location, photos, phone, email, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
		id,
		child.FullName(),
		child.Age(),
		child.BirthDate(),
		string(child.Gender()),
		child.Description(),
		child.Location(),
		child.Photos(),
		child.Phone(),
		child.Email(),
		string(child.Status()),
	)
	if err != nil {
		return nil, err
	}
	return child, nil
}

func (r *ChildPostgresRepository) Get(ctx context.Context, id string) (*domain.Child, error) {
	row := r.db.QueryRow(ctx, `SELECT id, full_name, age, birth_date, gender, description, location, photos, phone, email, status FROM children WHERE id=$1`, id)
	var (
		childID, fullName, gender, description, location, phone, email, status string
		age                                                                    int
		birthDate                                                              time.Time
		photos                                                                 []string
	)
	err := row.Scan(&childID, &fullName, &age, &birthDate, &gender, &description, &location, &photos, &phone, &email, &status)
	if errors.Is(err, pgx.ErrNoRows) {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	return domain.NewChild(childID, fullName, age, birthDate, domain.Gender(gender), description, location, photos, phone, email, domain.ChildStatus(status))
}

func (r *ChildPostgresRepository) Find(ctx context.Context, name string, status domain.ChildStatus, location string) ([]*domain.Child, error) {
	query := `SELECT id, full_name, age, birth_date, gender, description, location, photos, phone, email, status FROM children WHERE 1=1`
	args := []interface{}{}
	idx := 1
	if name != "" {
		query += ` AND full_name ILIKE '%' || $` + itoa(idx) + ` || '%'`
		args = append(args, name)
		idx++
	}
	if status != "" {
		query += ` AND status = $` + itoa(idx)
		args = append(args, string(status))
		idx++
	}
	if location != "" {
		query += ` AND location ILIKE '%' || $` + itoa(idx) + ` || '%'`
		args = append(args, location)
		idx++
	}
	rows, err := r.db.Query(ctx, query, args...)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var children []*domain.Child
	for rows.Next() {
		var (
			childID, fullName, gender, description, location, phone, email, status string
			age                                                                    int
			birthDate                                                              time.Time
			photos                                                                 []string
		)
		err := rows.Scan(&childID, &fullName, &age, &birthDate, &gender, &description, &location, &photos, &phone, &email, &status)
		if err != nil {
			return nil, err
		}
		child, err := domain.NewChild(childID, fullName, age, birthDate, domain.Gender(gender), description, location, photos, phone, email, domain.ChildStatus(status))
		if err != nil {
			return nil, err
		}
		children = append(children, child)
	}
	return children, nil
}

func (r *ChildPostgresRepository) Update(ctx context.Context, child *domain.Child) error {
	_, err := r.db.Exec(ctx, `UPDATE children SET full_name=$1, age=$2, birth_date=$3, gender=$4, description=$5, location=$6, photos=$7, phone=$8, email=$9, status=$10, updated_at=NOW() WHERE id=$11`,
		child.FullName(),
		child.Age(),
		child.BirthDate(),
		string(child.Gender()),
		child.Description(),
		child.Location(),
		child.Photos(),
		child.Phone(),
		child.Email(),
		string(child.Status()),
		child.ID(),
	)
	return err
}

func (r *ChildPostgresRepository) Remove(ctx context.Context, child *domain.Child) error {
	_, err := r.db.Exec(ctx, `DELETE FROM children WHERE id=$1`, child.ID())
	return err
}

// itoa convierte un int a string (para armar queries dinámicas)
func itoa(i int) string {
	return fmt.Sprintf("%d", i)
}
