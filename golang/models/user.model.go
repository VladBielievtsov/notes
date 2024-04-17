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
	GoogleID  *string    `gorm:"varchar(255);unique;not null" json:"googleId"`
	CreatedAt *time.Time `gorm:"not null;default:now()" json:"createdAt"`
}
