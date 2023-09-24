package approval_status

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type approvalStatusFormat struct {
	ID   uuid.UUID `json:"id"`
	Code string    `json:"code"`
	Name string    `json:"name"`
}

func ApprovalStatusFormat(approvalStatus entity.TarnsactionStatus) approvalStatusFormat {
	formatter := approvalStatusFormat{
		ID:   approvalStatus.ID,
		Code: approvalStatus.Code,
		Name: approvalStatus.Name,
	}
	return formatter
}
