package router

import (
	"github.com/VladBielievtsov/notes/handlers"
	"github.com/VladBielievtsov/notes/middleware"
	"github.com/gofiber/fiber/v2"
)

func Routes(micro *fiber.App) {
	micro.Get("/", handlers.HandlerIndex)

	micro.Route("/auth", func(router fiber.Router) {
		router.Get("/google", handlers.Google)
		router.Get("/google/callback", handlers.GoogleCallBack)

		router.Post("/logout", handlers.Logout)
	})

	micro.Get("/user", middleware.JWTMiddleware, handlers.GetMe)
}
