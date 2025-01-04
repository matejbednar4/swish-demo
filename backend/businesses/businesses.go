package businesses

import (
	"backend/global"
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/mattn/go-sqlite3"
	"golang.org/x/crypto/bcrypt"
)

type Business struct {
	Id        int       `json:"id"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Name      *string   `json:"name"`
	Address   *string   `json:"address"`
	Type      *string   `json:"type"`
	CreatedAt time.Time `json:"createdAt"`
	Filled    int       `json:"filled"`
}

func GetBusinesses(c *gin.Context, db *sql.DB) {

	// select everything from all rows from businesses.db
	rows, err := db.Query("SELECT id, email, name, address, type, created_at, filled FROM businesses")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve business accounts"})
		return
	}
	defer rows.Close() // close the rows at the end of the function

	var businesses []Business
	for rows.Next() {
		// Loop through the rows, bind each row to a new business, append the business to []businesses
		var business Business
		err := rows.Scan(&business.Id, &business.Email, &business.Name, &business.Address, &business.Type, &business.CreatedAt, &business.Filled)
		if err != nil {
			// There was an issue with the scan
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan business"})
			return
		}
		businesses = append(businesses, business)
	}

	err = rows.Err()
	if err != nil {
		// There was an issue with iterating over the rows
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error iterating over rows"})
		return
	}

	c.JSON(http.StatusOK, businesses) // Return the list of businesses in JSON
}

func GetBusinessById(c *gin.Context, db *sql.DB) {
	id := c.Query("id")

	var business Business

	err := db.QueryRow("SELECT id, email, name, address, type, created_at, filled FROM businesses WHERE id=?", id).Scan(&business.Id, &business.Email, &business.Name, &business.Address, &business.Type, &business.CreatedAt, &business.Filled)
	if err == sql.ErrNoRows {
		// No business found with the given ID
		c.JSON(http.StatusNotFound, gin.H{"error": "Business not found"})
		return
	}

	if err != nil {
		// There was an issue with the query
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve business"})
		return
	}

	c.JSON(http.StatusOK, business) // Return the business in JSON
}

func CreateBusiness(c *gin.Context, db *sql.DB) {
	var newBusiness Business
	// Bind sent data to newBusiness
	err := c.ShouldBindJSON(&newBusiness)
	if err != nil {
		// There was an issue binding the data
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind data"})
		return
	}

	// Hash the password
	hashedPassword, err := global.HashPassword(newBusiness.Password)
	if err != nil {
		// There was an issue with hashing
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to hash password"})
		return
	}

	// Insert into the database
	insertSQL := `INSERT INTO businesses (email, password) VALUES (?, ?)`
	result, err := db.Exec(insertSQL, newBusiness.Email, hashedPassword)
	if err != nil {
		if sqliteErr, ok := err.(sqlite3.Error); ok && sqliteErr.ExtendedCode == sqlite3.ErrConstraintUnique {
			c.JSON(http.StatusConflict, gin.H{"error": "Email is already registered"})
			return
		}
		// There was an issue with inserting
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error inserting into database"})
		return
	}

	newBusinessId, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve UID"})
	}

	c.JSON(http.StatusCreated, gin.H{"id": newBusinessId}) // return a message containing the business's ID
}

func DeleteBusinessById(c *gin.Context, db *sql.DB) {
	id := c.Query("id")

	// Delete the business with given ID
	result, err := db.Exec("DELETE FROM businesses WHERE id = ?", id)
	if err != nil {
		// There was an issue with deleting the business
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete business account"})
		return
	}

	rowsAffected, err := result.RowsAffected() // Get the number of affected rows
	if err != nil {
		// There was an issue getting the number of affected rows
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get affected rows"})
		return
	}
	if rowsAffected == 0 {
		// No row was affected => Business was not found
		c.JSON(http.StatusNotFound, gin.H{"error": "Business account not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Business account deleted successfully"}) // Return a message
}

func BusinessLogin(c *gin.Context, db *sql.DB) {
	var passedData Business
	// Bind sent data to passedBusiness
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

	// Find business with the given email, bind his ID to ID and his password to passwordDB
	err = db.QueryRow("SELECT id, password FROM businesses WHERE email=?", email).Scan(&ID, &passwordDB)
	if err == sql.ErrNoRows {
		// No business found with the given email
		c.JSON(http.StatusNotFound, gin.H{"error": "Business account not found"})
		return
	}
	if err != nil {
		// There was an issue going querying the database
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve business account"})
		return
	}

	// Compare password from database to the passed password
	err = bcrypt.CompareHashAndPassword([]byte(passwordDB), []byte(password))
	if err != nil {
		// The passwords don't match
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Wrong password"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"id": ID}) // return the business' ID
}

func UpdateBusiness(c *gin.Context, db *sql.DB) {
	id := c.Query("id")
	var passedData Business

	err := c.ShouldBindJSON(&passedData)
	if err != nil {
		// There was an issue binding the data
		c.JSON(http.StatusBadRequest, gin.H{"error": "Failed to bind data"})
		return
	}
	result, err := db.Exec("UPDATE businesses SET name=?, address=?, type=?, filled=? WHERE id=?", passedData.Name, passedData.Address, passedData.Type, 1, id)
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
		// business not found
		c.JSON(http.StatusBadRequest, gin.H{"error": "Business account not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "success"})
}
