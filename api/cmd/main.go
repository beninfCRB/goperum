package main

import (
	"fmt"
	"gostartup/config/database"
	route "gostartup/config/routes"
	"gostartup/pkg/middleware"
	"gostartup/pkg/util"
	"io"
	"os"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.New()

	//load file environment
	util.LoadEnv()

	//set database
	database.NewDatabase()

	//set static file in folder public
	r.Static("/public", "./public")
	r.LoadHTMLGlob("public/templates/*")

	//use logger terminal
	f, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(f)
	r.Use(gin.Recovery(), util.Logger())

	r.Use(middleware.CORS(middleware.CORSOptions{
		Origin: "http://localhost:3000",
	}))
	
	//routes
	public := r.Group("/")
	route.PublicRoutes(public)

	publicApi := r.Group("/api")
	route.PublicAPIRoutes(publicApi)

	privateApi := r.Group("/api")
	route.PrivateAPIRoutes(privateApi)
	//end routes

	//set host & port
	host := os.Getenv("SERVER_HOST")
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		fmt.Println("\nport not setup in file .env")
		port = "8000"
	}
	show := fmt.Sprintf("Server is running at http://%s:%s", host, port)
	fmt.Println(show)

	//run
	r.Run(":" + port)
}
