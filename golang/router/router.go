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

		router.Get("/logout", handlers.Logout)
	})

	micro.Get("/user", middleware.JWTMiddleware, handlers.GetMe)

	micro.Route("/notes", func(router fiber.Router) {
		router.Post("/", middleware.JWTMiddleware, handlers.Store)
		router.Get("/", middleware.JWTMiddleware, handlers.AllNotes)
		router.Delete("/:id", middleware.JWTMiddleware, handlers.RemoveNote)
		router.Put("/:id", middleware.JWTMiddleware, handlers.UpdateNote)
	})
}
