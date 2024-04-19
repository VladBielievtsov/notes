package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id,omitempty"`
	Fullname  string     `gorm:"varchar(255);not null" json:"fullname,omitempty"`
	Email     string     `gorm:"varchar(255);unique;not null" json:"email,omitempty"`
	Picture   string     `gorm:"varchar(510)" json:"picture,omitempty"`
	Notes     []Note     `gorm:"foreignKey:UserID" json:"notes"`
	GoogleID  *string    `gorm:"varchar(255);unique;not null" json:"googleId"`
	CreatedAt *time.Time `gorm:"not null;default:now()" json:"createdAt"`
}

type UserResponse struct {
	ID        uuid.UUID `json:"id,omitempty"`
	Fullname  string    `json:"fullname,omitempty"`
	Email     string    `json:"email,omitempty"`
	Picture   string    `json:"picture,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
}

func FilterUser(user *User) UserResponse {
	return UserResponse{
		ID:        *user.ID,
		Fullname:  user.Fullname,
		Email:     user.Email,
		Picture:   user.Picture,
		CreatedAt: *user.CreatedAt,
	}
}

type Note struct {
	ID        *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id,omitempty"`
	UserID    string     `gorm:"type:string;not null" json:"userID,omitempty"`
	Content   string     `gorm:"varchar(510);not null" json:"content,omitempty"`
	Color     string     `gorm:"varchar(255);not null" json:"color"`
	CreatedAt time.Time  `gorm:"not null;default:now()" json:"createdAt"`
}

type NoteRequest struct {
	Content string `json:"content"`
	Color   string `json:"color"`
}
