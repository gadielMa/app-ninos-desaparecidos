package main

import (
	"backend/config"
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/usecase"
	"context"
	"fmt"
	"log"
	"os"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Carga variables desde .env (o env.example) si existen
	_ = godotenv.Load(".env", "env.example")

	cfg := config.Load()
	if cfg.PostgresURL == "" {
		log.Fatal("POSTGRES_URL no configurado")
	}

	conn, err := pgx.Connect(context.Background(), cfg.PostgresURL)
	if err != nil {
		log.Fatalf("No se pudo conectar a Postgres: %v", err)
	}
	defer conn.Close(context.Background())

	repo := repository.NewChildPostgresRepository(conn)
	uc := usecase.NewChildUsecase(repo)
	h := handler.NewChildHandler(uc)
	e := echo.New()

	// Habilitar CORS con configuración explícita
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE, echo.OPTIONS},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	h.RegisterRoutes(e)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	fmt.Printf("Servidor escuchando en :%s\n", port)
	if err := e.Start(":" + port); err != nil {
		log.Fatal(err)
	}
}
