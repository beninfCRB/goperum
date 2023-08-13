package auth

import (
	"errors"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type Service interface {
	GenerateAccessToken(userID string) (string, error)
	GenerateRefreshToken(userID string) (string, error)
	ValidateToken(token string) (*jwt.Token, error)
}

type jwtService struct {
}

var ACCESS_SECRET_KEY = []byte(os.Getenv("ACCESS_SECRET_KEY"))
var REFRESH_SECRET_KEY = []byte(os.Getenv("REFRESH_SECRET_KEY"))

func AuthService() *jwtService {
	return &jwtService{}
}

func (s *jwtService) GenerateAccessToken(userID string) (string, error) {
	duration, _ := strconv.Atoi(os.Getenv("ACCESS_DURATION"))
	claim := jwt.MapClaims{}
	claim["user_id"] = userID
	claim["exp"] = time.Now().Add(time.Minute * time.Duration(duration)).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)

	signedToken, err := token.SignedString(ACCESS_SECRET_KEY)
	if err != nil {
		return signedToken, err
	}

	return signedToken, nil
}

func (s *jwtService) GenerateRefreshToken(userID string) (string, error) {
	duration, _ := strconv.Atoi(os.Getenv("REFRESH_DURATION"))
	claim := jwt.MapClaims{}
	claim["user_id"] = userID
	claim["exp"] = time.Now().Add(time.Hour * 24 * time.Duration(duration)).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claim)

	signedToken, err := token.SignedString(REFRESH_SECRET_KEY)
	if err != nil {
		return signedToken, err
	}

	return signedToken, nil
}

func (s *jwtService) ValidateToken(encodeToken string) (*jwt.Token, error) {
	token, err := jwt.Parse(encodeToken, func(token *jwt.Token) (interface{}, error) {
		_, ok := token.Method.(*jwt.SigningMethodHMAC)

		if !ok {
			return nil, errors.New("invalid token")
		}
		return []byte(ACCESS_SECRET_KEY), nil
	})

	if err != nil {
		return token, err
	}

	return token, nil
}
