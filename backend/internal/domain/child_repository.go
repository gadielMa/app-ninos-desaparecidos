package domain

import "context"

// ChildRepository representa la colección de todos los niños en el sistema.
type ChildRepository interface {
	// Add agrega un nuevo niño al repositorio.
	//   - ctx es el contexto para cancelación y timeouts.
	//   - child es el niño a agregar. Es requerido.
	// Devuelve el niño agregado (con id asignado) o error si falla.
	Add(ctx context.Context, child *Child) (*Child, error)

	// Get obtiene un niño por id.
	//   - ctx es el contexto para cancelación y timeouts.
	//   - id es el id del niño. Es requerido.
	// Devuelve el niño o nil si no existe, o error si falla.
	Get(ctx context.Context, id string) (*Child, error)

	// Find busca niños por nombre, estado o ubicación (cualquiera puede ser vacío para ignorar ese filtro).
	//   - ctx es el contexto para cancelación y timeouts.
	//   - name, status, location son filtros opcionales.
	// Devuelve la lista de niños encontrados o error si falla.
	Find(ctx context.Context, name string, status ChildStatus, location string) ([]*Child, error)

	// Update actualiza un niño existente.
	//   - ctx es el contexto para cancelación y timeouts.
	//   - child es el niño a actualizar. Es requerido.
	// Devuelve error si falla.
	Update(ctx context.Context, child *Child) error

	// Remove elimina un niño del repositorio.
	//   - ctx es el contexto para cancelación y timeouts.
	//   - child es el niño a eliminar. Es requerido.
	// Devuelve error si falla.
	Remove(ctx context.Context, child *Child) error
}
