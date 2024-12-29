package customers

import (
	"backend/global"
	"database/sql"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

type Customer struct {
	Id        int    `json:"id"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Location  string `json:"location"`
}

func GetCustomers(c *gin.Context, db *sql.DB) {

	// select everything from all rows from customers.db
	rows, err := db.Query("SELECT * FROM customers")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve customers"})
		return
	}
	defer rows.Close() // close the rows at the end of the function

	var customers []Customer
	for rows.Next() {
		// Loop through the rows, bind each row to a new customer, append the customer to []customers
		var customer Customer
		err := rows.Scan(&customer.Id, &customer.Email, &customer.Password, &customer.FirstName, &customer.LastName, &customer.Location)
		if err != nil {
			// There was an issue with the scan
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan customer"})
			return
		}
		customers = append(customers, customer)
	}

	err = rows.Err()
	if err != nil {
		// There was an issue with iterating over the rows
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error iterating over rows"})
		return
	}

	c.JSON(http.StatusOK, customers) // Return the list of customers in JSON
}

func GetCustomerById(c *gin.Context, db *sql.DB) {
	id := c.Query("id")

	var customer Customer

	err := db.QueryRow("SELECT * FROM customers WHERE id=?", id).Scan(&customer.Id, &customer.Email, &customer.Password, &customer.FirstName, &customer.LastName, &customer.Location)
	if err == sql.ErrNoRows {
		// No customer found with the given ID
		c.JSON(http.StatusNotFound, gin.H{"error": "customer not found"})
		return
	}

	if err != nil {
		// There was an issue with the query
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve customer"})
		return
	}

	c.JSON(http.StatusOK, customer) // Return the customer in JSON
}

func CreateCustomer(c *gin.Context, db *sql.DB) {
	var newCustomer Customer
	// Bind sent data to newcustomer
	err := c.ShouldBindJSON(&newCustomer)
	if err != nil {
		// There was an issue binding the data
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind data"})
		return
	}

	// Hash the password
	hashedPassword, err := global.HashPassword(newCustomer.Password)
	if err != nil {
		// There was an issue with hashing
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to hash password"})
		return
	}

	// Insert into the database
	insertSQL := `INSERT INTO customers (email, password) VALUES (?, ?)`
	result, err := db.Exec(insertSQL, newCustomer.Email, hashedPassword)
	if err != nil {
		if sqliteErr, ok := err.(sqlite3.Error); ok && sqliteErr.ExtendedCode == sqlite3.ErrConstraintUnique {
			c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
			return
		}
		// There was an issue with inserting
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error inserting into database"})
		return
	}

	newcustomerId, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve UID"})
	}

	c.JSON(http.StatusCreated, gin.H{"id": newcustomerId}) // return a message containing the customer's ID
}

func DeleteCustomerById(c *gin.Context, db *sql.DB) {
	id := c.Query("id")

	// Delete the customer with given ID
	result, err := db.Exec("DELETE FROM customers WHERE id = ?", id)
	if err != nil {
		// There was an issue with deleting the customer
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete customer"})
		return
	}

	rowsAffected, err := result.RowsAffected() // Get the number of affected rows
	if err != nil {
		// There was an issue getting the number of affected rows
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get affected rows"})
		return
	}
	if rowsAffected == 0 {
		// No row was affected => customer was not found
		c.JSON(http.StatusNotFound, gin.H{"error": "customer not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "customer deleted successfully"}) // Return a message
}

func CustomerLogin(c *gin.Context, db *sql.DB) {
	var passedData Customer
	// Bind sent data to passedcustomer
	err := c.ShouldBindJSON(&passedData)
	if err != nil {
		// There was an issue binding the data
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind data"})
		return
	}

	// email, password store the passed data
	email := passedData.Email
	password := passedData.Password

	// passwordDB will store data from the database
	var ID int
	var passwordDB string

	// Find customer with the given email, bind his ID to ID and his password to passwordDB
	err = db.QueryRow("SELECT id, password FROM customers WHERE email=?", email).Scan(&ID, &passwordDB)
	if err == sql.ErrNoRows {
		// No customer found with the given email
		c.JSON(http.StatusNotFound, gin.H{"error": "customer not found"})
		return
	}
	if err != nil {
		// There was an issue going querying the database
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve customer"})
		return
	}

	// Compare password from database to the passed password
	err = bcrypt.CompareHashAndPassword([]byte(passwordDB), []byte(password))
	if err != nil {
		// The passwords don't match
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Wrong password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": ID}) // return the customer's ID
}

func UpdateCustomer(c *gin.Context, db *sql.DB) {
	id := c.Query("id")
	var passedData Customer

	err := c.ShouldBindJSON(&passedData)
	if err != nil {
		// There was an issue binding the data
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind data"})
		return
	}

	result, err := db.Exec("UPDATE customers SET firstName=?, lastName=?, location=? WHERE id=?", passedData.FirstName, passedData.LastName, passedData.Location, id)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to update database"})
		return
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Unable to get affected rows"})
		return
	}

	if rowsAffected == 0 {
		// customer not found
		c.JSON(http.StatusBadRequest, gin.H{"error": "Customer not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})
}
