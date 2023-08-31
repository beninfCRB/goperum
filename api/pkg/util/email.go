package util

import (
	"bytes"
	"crypto/tls"
	"gostartup/config/database/entity"
	"html/template"
	"log"
	"os"
	"path/filepath"
	"strconv"

	"github.com/k3a/html2text"
	"gopkg.in/gomail.v2"
)

type EmailData struct {
	URL       string
	FirstName string
	Subject   string
}

func ParseTemplateDir(dir string) (*template.Template, error) {
	var paths []string
	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if !info.IsDir() {
			paths = append(paths, path)
		}
		return nil
	})

	if err != nil {
		return nil, err
	}

	return template.ParseFiles(paths...)
}

func SendEmail(user *entity.User, data *EmailData) {
	// Sender data.
	from := os.Getenv("EMAIL_FROM")
	smtpPass := os.Getenv("EMAIL_SMTP_PASSWORD")
	smtpUser := os.Getenv("EMAIL_SMTP_USER")
	to := user.Email
	smtpHost := os.Getenv("EMAIL_SMTP_HOST")
	smtpPort, _ := strconv.Atoi(os.Getenv("EMAIL_SMTP_PORT"))

	var body bytes.Buffer

	template, err := ParseTemplateDir("public/templates")
	if err != nil {
		log.Fatal("Could not parse template", err)
	}

	template.ExecuteTemplate(&body, "verificationCode.html", &data)

	m := gomail.NewMessage()

	m.SetHeader("From", from)
	m.SetHeader("To", to)
	m.SetHeader("Subject", data.Subject)
	m.SetBody("text/html", body.String())
	m.AddAlternative("text/plain", html2text.HTML2Text(body.String()))

	d := gomail.NewDialer(smtpHost, smtpPort, smtpUser, smtpPass)
	d.TLSConfig = &tls.Config{InsecureSkipVerify: true}

	// Send Email
	if err := d.DialAndSend(m); err != nil {
		log.Fatal("Could not send email: ", err)
	}

}
