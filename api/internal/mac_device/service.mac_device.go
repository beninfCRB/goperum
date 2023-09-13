package mac_device

import (
	"errors"
	"gostartup/config/database/entity"
	"gostartup/pkg/util"
	"os"
	"strconv"

	"github.com/google/uuid"
)

type Service interface {
	SaveMacDevice(input uuid.UUID) (entity.MacDevice, error)
	DeleteMacDevice(input uuid.UUID) (entity.MacDevice, error)
	CountUser(input uuid.UUID) (bool, error)
}

type service struct {
	repository Respository
}

func MacDeviceService(repository Respository) *service {
	return &service{repository}
}

func (s *service) SaveMacDevice(input uuid.UUID) (entity.MacDevice, error) {
	mac, _ := util.GetMacAddr()
	MacDevice := entity.MacDevice{}
	MacDevice.UserId = input
	MacDevice.MacAddress = mac
	MacDevice.IsActive = true

	count, err := s.repository.Count(input)
	if err != nil {
		return MacDevice, err
	}

	limit, _ := strconv.ParseInt(os.Getenv("LIMIT_SIGNIN_USER"), 10, 64)

	if count >= limit {
		return MacDevice, errors.New("user limited access")
	}

	save, err := s.repository.Save(MacDevice)
	if err != nil {
		return save, err
	}

	return save, nil
}

func (s *service) CountUser(input uuid.UUID) (bool, error) {
	count, err := s.repository.Count(input)
	if err != nil {
		return true, err
	}

	limit, _ := strconv.ParseInt(os.Getenv("LIMIT_SIGNIN_USER"), 10, 64)

	if count >= limit {
		return true, errors.New("user limited access")
	}

	return false, nil
}

func (s *service) DeleteMacDevice(input uuid.UUID) (entity.MacDevice, error) {
	mac, _ := util.GetMacAddr()

	macDevice, err := s.repository.FindByMacAddress(input, mac)
	if err != nil {
		return macDevice, err
	}

	delete, err := s.repository.Delete(macDevice)
	if err != nil {
		return macDevice, err
	}

	return delete, nil
}
