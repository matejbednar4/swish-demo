package main

import (
	"backend/database"
	"backend/users"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db := database.LaunchDatabase()
	defer db.Close()
	database.CreateTable(db)

	router := gin.Default()
	router.Use(cors.New(cors.Config{

		AllowOrigins: []string{"http://localhost:3000"}, // Allow your frontend to access the backend
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	router.GET("/users", func(c *gin.Context) { users.GetUsers(c, db) })
	router.GET("/user", func(c *gin.Context) { users.GetUserByIdOrEmail(c, db) })
	router.POST("/users", func(c *gin.Context) { users.CreateUser(c, db) })
	router.POST("/users/login", func(c *gin.Context) { users.Login(c, db) })
	router.DELETE("/user", func(c *gin.Context) { users.DeleteUserById(c, db) })
	router.PUT("/user/info", func(c *gin.Context) { users.AddUserInfo(c, db) })

	router.Run(":8080")
}
