package main

import (
	"log"

	"github.com/lakshya/backend/internal/database"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"github.com/lakshya/backend/internal/auth"
)

func main() {

	err := godotenv.Load()

	if err != nil {
		log.Fatal(".env file not found")
	}

	db, err := database.Connect()

	if err != nil {
		log.Fatal(err)
	}

	defer db.Close()

	router := gin.Default()

	authRepo := auth.NewRepository(db)

	authService := auth.NewService(
		authRepo,
	)

	authHandler := auth.NewHandler(
		authService,
	)

	router.POST(
		"/api/auth/register",
		authHandler.Register,
	)

	router.GET("/health", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "API running",
		})
	})

	router.Run(":8080")
}
