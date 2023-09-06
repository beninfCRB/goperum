package mac_device

import "github.com/google/uuid"

type MacDeviceInput struct {
	UserId uuid.UUID `json:"user_id" binding:"required"`
}
