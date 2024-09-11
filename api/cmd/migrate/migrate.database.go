package main

import (
	"fmt"
	"gostartup/config/database"
	"gostartup/config/database/entity"
)

func main() {
	auto := database.NewDatabase()

	mg := auto.AutoMigrate(
		&entity.RoleUser{},
		&entity.User{},
		&entity.Customer{},
		&entity.Product{},
		&entity.PasswordReset{},
		&entity.VerificationUser{},
		&entity.MacDevice{},
		&entity.Marketing{},
		&entity.TypeDownPayment{},
		&entity.TransactionStatus{},
		&entity.TarnsactionStatus{},
		&entity.PaymentMethod{},
		&entity.Bank{},
		&entity.Transaction{},
		&entity.PurchaseMethod{},
		&entity.Payment{},
		&entity.ProductImage{},
	)

	if mg != nil {
		fmt.Println("Migration Failed")
	} else {
		fmt.Println("Migration Success")
	}
}
