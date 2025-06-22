package handler

import (
	"backend/internal/domain"
	"backend/internal/usecase"
	"context"
	"net/http"
	"time"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type ChildHandler struct {
	uc *usecase.ChildUsecase
}

func NewChildHandler(uc *usecase.ChildUsecase) *ChildHandler {
	return &ChildHandler{uc: uc}
}

type ChildDTO struct {
	ID          string   `json:"id"`
	FullName    string   `json:"full_name"`
	Age         int      `json:"age"`
	BirthDate   string   `json:"birth_date"`
	Gender      string   `json:"gender"`
	Description string   `json:"description"`
	Location    string   `json:"location"`
	Photos      []string `json:"photos"`
	Phone       string   `json:"phone"`
	Email       string   `json:"email"`
	Status      string   `json:"status"`
}

func toDTO(child *domain.Child) *ChildDTO {
	return &ChildDTO{
		ID:          child.ID(),
		FullName:    child.FullName(),
		Age:         child.Age(),
		BirthDate:   child.BirthDate().Format("2006-01-02"),
		Gender:      string(child.Gender()),
		Description: child.Description(),
		Location:    child.Location(),
		Photos:      child.Photos(),
		Phone:       child.Phone(),
		Email:       child.Email(),
		Status:      string(child.Status()),
	}
}

func fromDTO(dto *ChildDTO) (*domain.Child, error) {
	birthDate, err := time.Parse("2006-01-02", dto.BirthDate)
	if err != nil {
		return nil, err
	}
	return domain.NewChild(dto.ID, dto.FullName, dto.Age, birthDate, domain.Gender(dto.Gender), dto.Description, dto.Location, dto.Photos, dto.Phone, dto.Email, domain.ChildStatus(dto.Status))
}

func (h *ChildHandler) RegisterRoutes(e *echo.Echo) {
	e.POST("/children", h.CreateChild)
	e.GET("/children/:id", h.GetChild)
	e.GET("/children", h.FindChildren)
	e.PUT("/children/:id", h.UpdateChild)
	e.DELETE("/children/:id", h.DeleteChild)
}

func (h *ChildHandler) CreateChild(c echo.Context) error {
	var dto ChildDTO
	if err := c.Bind(&dto); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid input"})
	}
	if dto.ID == "" {
		dto.ID = uuid.New().String()
	}
	child, err := fromDTO(&dto)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	ctx := context.Background()
	created, err := h.uc.CreateChild(ctx, child)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusCreated, toDTO(created))
}

func (h *ChildHandler) GetChild(c echo.Context) error {
	id := c.Param("id")
	ctx := context.Background()
	child, err := h.uc.GetChild(ctx, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	if child == nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "not found"})
	}
	return c.JSON(http.StatusOK, toDTO(child))
}

func (h *ChildHandler) FindChildren(c echo.Context) error {
	name := c.QueryParam("name")
	status := domain.ChildStatus(c.QueryParam("status"))
	location := c.QueryParam("location")
	ctx := context.Background()
	children, err := h.uc.FindChildren(ctx, name, status, location)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	var dtos []*ChildDTO
	for _, child := range children {
		dtos = append(dtos, toDTO(child))
	}
	return c.JSON(http.StatusOK, dtos)
}

func (h *ChildHandler) UpdateChild(c echo.Context) error {
	id := c.Param("id")
	var dto ChildDTO
	if err := c.Bind(&dto); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": "invalid input"})
	}
	child, err := fromDTO(&dto)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	childID := child.ID()
	if childID == "" {
		childID = id
	}
	ctx := context.Background()
	childWithID, err := h.uc.GetChild(ctx, childID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	if childWithID == nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "not found"})
	}
	childWithID.UpdateStatus(child.Status())
	childWithID.UpdatePhotos(child.Photos())
	// Actualizar otros campos si es necesario
	if err := h.uc.UpdateChild(ctx, childWithID); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, toDTO(childWithID))
}

func (h *ChildHandler) DeleteChild(c echo.Context) error {
	id := c.Param("id")
	ctx := context.Background()
	child, err := h.uc.GetChild(ctx, id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	if child == nil {
		return c.JSON(http.StatusNotFound, map[string]string{"error": "not found"})
	}
	if err := h.uc.DeleteChild(ctx, child); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}
	return c.NoContent(http.StatusNoContent)
}
