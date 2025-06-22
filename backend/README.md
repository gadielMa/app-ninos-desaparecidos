# Backend Niños Perdidos

## Requisitos
- Go 1.21+
- PostgreSQL

## Configuración
1. Copia `.env.example` a `.env` y completa tus datos de conexión:
   ```sh
   cp .env.example .env
   # Edita .env con tus credenciales
   ```

2. Crea la base de datos y ejecuta la migración:
   ```sh
   psql -U usuario -d tu_basededatos -f migrations/001_create_children_table.sql
   ```

## Ejecución

```sh
cd backend
export $(cat .env | xargs)
go run main.go
```

El servidor escuchará en el puerto definido en `PORT` (por defecto 8080).

## Endpoints
- `POST   /children`    — Crear niño perdido
- `GET    /children/:id` — Obtener niño por ID
- `GET    /children`     — Buscar niños (por nombre, estado, ubicación)
- `PUT    /children/:id` — Modificar niño
- `DELETE /children/:id` — Borrar niño 
