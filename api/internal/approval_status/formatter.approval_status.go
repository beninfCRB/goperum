package approval_status

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
)

type approvalStatusFormat struct {
	ID         uuid.UUID   `json:"id"`
	Code       string      `json:"code"`
	Name       string      `json:"name"`
	RoleUserID uuid.UUID   `json:"role_user_id"`
	RoleUser   interface{} `json:"role_user"`
}

func ApprovalStatusFormat(approvalStatus entity.TarnsactionStatus) approvalStatusFormat {
	formatter := approvalStatusFormat{
		ID:         approvalStatus.ID,
		Code:       approvalStatus.Code,
		Name:       approvalStatus.Name,
		RoleUserID: approvalStatus.RoleUserID,
		RoleUser:   approvalStatus.RoleUser,
	}
	return formatter
}
