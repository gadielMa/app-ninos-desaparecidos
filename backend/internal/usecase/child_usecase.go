package usecase

import (
	"backend/internal/domain"
	"context"
)

type ChildUsecase struct {
	repo domain.ChildRepository
}

func NewChildUsecase(repo domain.ChildRepository) *ChildUsecase {
	return &ChildUsecase{repo: repo}
}

func (u *ChildUsecase) CreateChild(ctx context.Context, child *domain.Child) (*domain.Child, error) {
	return u.repo.Add(ctx, child)
}

func (u *ChildUsecase) GetChild(ctx context.Context, id string) (*domain.Child, error) {
	return u.repo.Get(ctx, id)
}

func (u *ChildUsecase) FindChildren(ctx context.Context, name string, status domain.ChildStatus, location string) ([]*domain.Child, error) {
	return u.repo.Find(ctx, name, status, location)
}

func (u *ChildUsecase) UpdateChild(ctx context.Context, child *domain.Child) error {
	return u.repo.Update(ctx, child)
}

func (u *ChildUsecase) DeleteChild(ctx context.Context, child *domain.Child) error {
	return u.repo.Remove(ctx, child)
}
