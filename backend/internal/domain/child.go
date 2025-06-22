package domain

import (
	"errors"
	"time"

	"github.com/google/uuid"
)

// Gender representa el género del niño
// Puede ser "masculino", "femenino" u "otro"
type Gender string

const (
	GenderMale   Gender = "masculino"
	GenderFemale Gender = "femenino"
	GenderOther  Gender = "otro"
)

type ChildStatus string

const (
	StatusActive   ChildStatus = "activo"
	StatusUrgent   ChildStatus = "urgente"
	StatusResolved ChildStatus = "resuelto"
)

type Child struct {
	id         string
	attributes childAttributes
}

type childAttributes struct {
	fullName    string
	age         int
	birthDate   time.Time
	gender      Gender
	description string
	location    string
	photos      []string
	phone       string
	email       string
	status      ChildStatus
}

// NewChild crea una nueva entidad Child validando invariantes
func NewChild(id, fullName string, age int, birthDate time.Time, gender Gender, description, location string, photos []string, phone, email string, status ChildStatus) (*Child, error) {
	if id == "" {
		id = uuid.New().String()
	}
	if fullName == "" {
		return nil, errors.New("el nombre completo no puede estar vacío")
	}
	if age < 0 {
		return nil, errors.New("la edad no puede ser negativa")
	}
	if phone == "" {
		return nil, errors.New("el teléfono no puede estar vacío")
	}
	if email == "" {
		return nil, errors.New("el email no puede estar vacío")
	}
	if status == "" {
		status = StatusActive
	}
	return &Child{
		id: id,
		attributes: childAttributes{
			fullName:    fullName,
			age:         age,
			birthDate:   birthDate,
			gender:      gender,
			description: description,
			location:    location,
			photos:      photos,
			phone:       phone,
			email:       email,
			status:      status,
		},
	}, nil
}

// Métodos de acceso (getters)
func (c *Child) ID() string           { return c.id }
func (c *Child) FullName() string     { return c.attributes.fullName }
func (c *Child) Age() int             { return c.attributes.age }
func (c *Child) BirthDate() time.Time { return c.attributes.birthDate }
func (c *Child) Gender() Gender       { return c.attributes.gender }
func (c *Child) Description() string  { return c.attributes.description }
func (c *Child) Location() string     { return c.attributes.location }
func (c *Child) Photos() []string     { return c.attributes.photos }
func (c *Child) Phone() string        { return c.attributes.phone }
func (c *Child) Email() string        { return c.attributes.email }
func (c *Child) Status() ChildStatus  { return c.attributes.status }

// Métodos de mutación con validación
func (c *Child) UpdateStatus(status ChildStatus) error {
	if status == "" {
		return errors.New("el estado no puede estar vacío")
	}
	c.attributes.status = status
	return nil
}

func (c *Child) UpdatePhotos(photos []string) {
	c.attributes.photos = photos
}
