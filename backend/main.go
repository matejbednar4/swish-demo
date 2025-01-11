package main

import (
	"backend/businesses"
	customers "backend/customers"
	database "backend/database"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	db := database.OpenDatabase()
	defer db.Close()
	database.CreateTables(db)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"}, // Allow frontend to access the backend
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	// Customer accounts
	router.GET("/customers", func(c *gin.Context) { customers.GetCustomers(c, db) })
	router.GET("/customer", func(c *gin.Context) { customers.GetCustomerById(c, db) })
	router.POST("/customer", func(c *gin.Context) { customers.CreateCustomer(c, db) })
	router.POST("/customer/login", func(c *gin.Context) { customers.CustomerLogin(c, db) })
	router.DELETE("/customer", func(c *gin.Context) { customers.DeleteCustomerById(c, db) })
	router.PUT("/customer", func(c *gin.Context) { customers.UpdateCustomer(c, db) })
	router.PUT("/customer/name", func(c *gin.Context) { customers.UpdateName(c, db) })
	router.PUT("/customer/address", func(c *gin.Context) { customers.UpdateAddress(c, db) })
	router.POST("/customer/pfp", func(c *gin.Context) { customers.AddCustomerPfp(c, db) })

	// Business accounts
	router.GET("/businesses", func(c *gin.Context) { businesses.GetBusinesses(c, db) })
	router.GET("/business", func(c *gin.Context) { businesses.GetBusinessById(c, db) })
	router.GET("/business/random", func(c *gin.Context) { businesses.GetRandomBusiness(c, db) })
	router.POST("/business", func(c *gin.Context) { businesses.CreateBusiness(c, db) })
	router.POST("/business/login", func(c *gin.Context) { businesses.BusinessLogin(c, db) })
	router.DELETE("/business", func(c *gin.Context) { businesses.DeleteBusinessById(c, db) })
	router.PUT("/business", func(c *gin.Context) { businesses.UpdateBusiness(c, db) })

	router.GET("/businessTypes", func(c *gin.Context) { businesses.GetBusinessTypes(c, db) })

	router.Run(":8080")
}
