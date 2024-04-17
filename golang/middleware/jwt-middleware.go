package middleware

import (
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
)

func JWTMiddleware(c *fiber.Ctx) error {
	token := c.Cookies("token")

	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Unauthorized"})
	}

	if claims.Valid() != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{"message": "Token expired"})
	}

	userID := claims["sub"].(string)

	c.Locals("userID", userID)

	return c.Next()

}