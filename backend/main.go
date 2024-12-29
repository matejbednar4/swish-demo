package main

import (
	businesses "backend/business"
	businessesDb "backend/business/database"
	customers "backend/customer"
	customersDb "backend/customer/database"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/mattn/go-sqlite3"
)

func main() {
	customersDatabase := customersDb.LaunchCustomersDb()
	defer customersDatabase.Close()
	customersDb.CreateCustomersTable(customersDatabase)

	businessesDatabase := businessesDb.LaunchBusinessDb()
	defer businessesDatabase.Close()
	businessesDb.CreateBusinessTable(businessesDatabase)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:3000"}, // Allow frontend to access the backend
		AllowMethods: []string{"GET", "POST", "PUT", "PATCH", "DELETE"},
		AllowHeaders: []string{"Origin", "Content-Type", "Authorization"},
	}))

	// Customer accounts
	router.GET("/customers", func(c *gin.Context) { customers.GetCustomers(c, customersDatabase) })
	router.GET("/customer", func(c *gin.Context) { customers.GetCustomerById(c, customersDatabase) })
	router.POST("/customer", func(c *gin.Context) { customers.CreateCustomer(c, customersDatabase) })
	router.POST("/customer/login", func(c *gin.Context) { customers.CustomerLogin(c, customersDatabase) })
	router.DELETE("/customer", func(c *gin.Context) { customers.DeleteCustomerById(c, customersDatabase) })
	router.PUT("/customer", func(c *gin.Context) { customers.UpdateCustomer(c, customersDatabase) })

	// Business accounts
	router.GET("/businesses", func(c *gin.Context) { businesses.GetBusinesses(c, businessesDatabase) })
	router.GET("/business", func(c *gin.Context) { businesses.GetBusinessById(c, businessesDatabase) })
	router.POST("/business", func(c *gin.Context) { businesses.CreateBusiness(c, businessesDatabase) })
	router.POST("/business/login", func(c *gin.Context) { businesses.BusinessLogin(c, businessesDatabase) })
	router.DELETE("/business", func(c *gin.Context) { businesses.DeleteBusinessById(c, businessesDatabase) })
	router.PUT("/business", func(c *gin.Context) { businesses.UpdateBusiness(c, businessesDatabase) })

	router.Run(":8080")
}
