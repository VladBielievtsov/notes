package handlers

import "github.com/gofiber/fiber/v2"

func HandlerIndex(c *fiber.Ctx) error {
	return c.SendString("Welcome! to api")
}
