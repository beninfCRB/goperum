package mac_device

import (
	"gostartup/config/database/entity"

	"github.com/google/uuid"
	"gorm.io/gorm"
)

type Respository interface {
	Save(macDevice entity.MacDevice) (entity.MacDevice, error)
	FindByMacAddress(userID uuid.UUID, macAddress string) (entity.MacDevice, error)
	Count(userID uuid.UUID) (int64, error)
	Delete(macDevice entity.MacDevice) (entity.MacDevice, error)
}

type repository struct {
	db *gorm.DB
}

func MacDeviceRepository(db *gorm.DB) *repository {
	return &repository{db}
}

func (r *repository) Save(macDevice entity.MacDevice) (entity.MacDevice, error) {
	err := r.db.Create(&macDevice).Error

	if err != nil {
		return macDevice, err
	}

	return macDevice, err
}

func (r *repository) FindByMacAddress(userID uuid.UUID, macAddress string) (entity.MacDevice, error) {
	var macDevice entity.MacDevice
	err := r.db.Where("user_id=? OR mac_address=?", userID, macAddress).Find(&macDevice).Error
	if err != nil {
		return macDevice, err
	}
	return macDevice, nil
}

func (r *repository) Delete(macDevice entity.MacDevice) (entity.MacDevice, error) {
	err := r.db.Delete(&macDevice)
	if err != nil {
		return macDevice, err.Error
	}
	return macDevice, nil
}

func (r *repository) Count(userID uuid.UUID) (int64, error) {
	var macDevice entity.MacDevice
	count := r.db.Where("user_id=?", userID).Find(&macDevice)

	return count.RowsAffected, nil
}
