package handlers

import (
	"time"

	"github.com/VladBielievtsov/notes/database"
	"github.com/VladBielievtsov/notes/models"
	"github.com/gofiber/fiber/v2"
)

func Store(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)

	var payload models.NoteRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": err.Error()})
	}

	newNote := models.Note{
		Content: payload.Content,
		Color:   payload.Color,
		UserID:  userID,
	}

	if err := database.DB.Create(&newNote).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to create note"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "data": fiber.Map{"note": &newNote}})
}

func AllNotes(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)

	var notes []models.Note

	result := database.DB.Where("user_id = ?", userID).Order("created_at DESC").Find(&notes)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "fail", "message": "Notes not found", "userID": userID, "err": result.Error})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "data": fiber.Map{"notes": notes}})
}

func RemoveNote(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)

	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "ID parameter is required"})
	}

	var note models.Note
	result := database.DB.First(&note, "id = ?", id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "fail", "message": "Note not found"})
	}

	if note.UserID != userID {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "Unauthorized access to delete this note"})
	}

	if err := database.DB.Delete(&note).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to delete note", "error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Note deleted successfully", "id": id})
}

func UpdateNote(c *fiber.Ctx) error {
	userID := c.Locals("userID").(string)

	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "ID parameter is required"})
	}

	var note models.Note
	result := database.DB.First(&note, "id = ?", id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "fail", "message": "Note not found"})
	}

	if note.UserID != userID {
		return c.Status(fiber.StatusForbidden).JSON(fiber.Map{"status": "fail", "message": "Unauthorized access to delete this note"})
	}

	var payload models.Note
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": err.Error()})
	}

	note.Color = payload.Color
	note.Content = payload.Content
	note.CreatedAt = time.Now()

	if err := database.DB.Save(&note).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to update note", "error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"note": note}})
}
