package main

import (
	"fmt"
	"gostartup/config/database"
	"gostartup/config/database/entity"
)

func main() {
	auto := database.NewDatabase()

	mg := auto.AutoMigrate(&entity.User{}, &entity.Customer{}, &entity.Area{})

	if mg != nil {
		fmt.Println("Migration Failed")
	} else {
		fmt.Println("Migration Success")
	}
}
