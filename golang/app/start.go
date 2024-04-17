package app

import (
	"os"

	"github.com/VladBielievtsov/notes/config"
	"github.com/VladBielievtsov/notes/database"
	"github.com/VladBielievtsov/notes/router"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func Start() error {
	// Load env
	err := config.LoadENV()
	if err != nil {
		return err
	}

	// Start database
	err = database.ConnetcDB()
	if err != nil {
		return nil
	}

	// defer Close database

	// creat app
	app := fiber.New()
	micro := fiber.New()

	app.Mount("/api", micro)

	// attach middleware
	// cors, etc...
	micro.Use(cors.New(cors.Config{
		AllowOrigins:     "http://localhost:5173",
		AllowHeaders:     "Origin, Content-Type, Accept",
		AllowMethods:     "GET, POST, PUT, DELETE",
		AllowCredentials: true,
	}))

	// setup routes
	router.Routes(micro)

	port := os.Getenv("PORT")
	app.Listen(":" + port)

	return nil

}
