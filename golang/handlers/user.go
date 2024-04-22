package handlers

import (
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/VladBielievtsov/notes/config"
	"github.com/VladBielievtsov/notes/database"
	"github.com/VladBielievtsov/notes/models"
	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
	"golang.org/x/oauth2"
)

func Google(c *fiber.Ctx) error {
	url := config.GetGoogleOauthConfig().AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	return c.Redirect(url)
}

func GoogleCallBack(c *fiber.Ctx) error {
	code := c.Query("code")
	token, err := config.GetGoogleOauthConfig().Exchange(oauth2.NoContext, code)
	if err != nil {
		return err
	}

	client := config.GetGoogleOauthConfig().Client(oauth2.NoContext, token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	var googleUser struct {
		Email   string `json:"email"`
		Name    string `json:"name"`
		Picture string `json:"picture"`
		ID      string `json:"id"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&googleUser); err != nil {
		return err
	}

	var existingUser models.User
	err = database.DB.Where("email = ?", googleUser.Email).First(&existingUser).Error
	if err != nil {
		newUser := models.User{
			Fullname: googleUser.Name,
			Email:    googleUser.Email,
			GoogleID: &googleUser.ID,
			Picture:  googleUser.Picture,
		}
		if err := database.DB.Create(&newUser).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to create user"})
		}
		existingUser = newUser
		c.Locals("userID", existingUser.ID)
	} else {
		if existingUser.GoogleID == nil {
			existingUser.GoogleID = &googleUser.ID
			existingUser.Picture = googleUser.Picture
			database.DB.Save(&existingUser)
			c.Locals("userID", existingUser.ID)
		}
		existingUser.Picture = googleUser.Picture
		existingUser.Fullname = googleUser.Name
		database.DB.Save(&existingUser)
		c.Locals("userID", existingUser.ID)
	}

	tokenString, err := generateJWTToken(existingUser.ID)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": fmt.Sprintf("generating JWT Token failed: %v", err)})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    tokenString,
		Path:     "/",
		MaxAge:   1440 * 60,
		Secure:   false,
		HTTPOnly: true,
		Domain:   "localhost",
	})

	return c.Redirect(os.Getenv("FRONTEND"))
}

func generateJWTToken(userID *uuid.UUID) (string, error) {
	tokenByte := jwt.New(jwt.SigningMethodHS256)
	claims := tokenByte.Claims.(jwt.MapClaims)

	claims["sub"] = userID
	claims["exp"] = time.Now().Add(1440 * time.Minute).Unix()
	claims["iat"] = time.Now().Unix()
	claims["nbf"] = time.Now().Unix()

	return tokenByte.SignedString([]byte(os.Getenv("JWT_SECRET")))
}

func Logout(c *fiber.Ctx) error {
	token := c.Cookies("token")

	if token != "" {
		c.Cookie(&fiber.Cookie{
			Name:    "token",
			Value:   "",
			Expires: time.Now().Add(-time.Hour),
		})
	}

	c.Locals("userID", nil)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success"})
}

func GetMe(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)

	var user models.User
	result := database.DB.First(&user, "id = ?", userID)
	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "User not found"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"user": models.FilterUser(&user)}})
}
