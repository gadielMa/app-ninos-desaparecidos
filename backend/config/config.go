package config

import (
	"os"
)

type Config struct {
	PostgresURL string
}

func Load() *Config {
	return &Config{
		PostgresURL: os.Getenv("POSTGRES_URL"),
	}
}
