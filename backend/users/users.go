package users

import (
	"backend/global"
	"database/sql"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	Id        int    `json:"id"`
	Email     string `json:"email"`
	Password  string `json:"password"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
	Location  string `json:"location"`
}

func GetUsers(c *gin.Context, db *sql.DB) {

	// select everything from all rows from users.db
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve users"})
		return
	}
	defer rows.Close() // close the rows at the end of the function

	var users []User
	for rows.Next() {
		// Loop through the rows, bind each row to a new user, append the user to []users
		var user User
		err := rows.Scan(&user.Id, &user.Email, &user.Password, &user.FirstName, &user.LastName, &user.Location)
		if err != nil {
			// There was an issue with the scan
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to scan user"})
			return
		}
		users = append(users, user)
	}

	err = rows.Err()
	if err != nil {
		// There was an issue with iterating over the rows
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error iterating over rows"})
		return
	}

	c.JSON(http.StatusOK, users) // Return the list of users in JSON
}

func GetUserByIdOrEmail(c *gin.Context, db *sql.DB) {
	id := c.Query("id")
	email := c.Query("email")

	if id != "" {
		// If there is an ID in the query
		var user User

		err := db.QueryRow("SELECT * FROM users WHERE id=?", id).Scan(&user.Id, &user.Email, &user.Password, &user.FirstName, &user.LastName, &user.Location)
		if err == sql.ErrNoRows {
			// No user found with the given ID
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		if err != nil {
			// There was an issue with the query
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user"})
			return
		}

		c.JSON(http.StatusOK, user) // Return the user in JSON
		return
	}

	if email != "" {
		// If there is an email in the query
		var user User

		err := db.QueryRow("SELECT * FROM users WHERE email=?", email).Scan(&user.Id, &user.Email, &user.Password, &user.FirstName, &user.LastName, &user.Location)
		if err == sql.ErrNoRows {
			// No user found with the given Email
			c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
			return
		}

		if err != nil {
			// There was an issue with the query
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user"})
			return
		}

		c.JSON(http.StatusOK, user) // Return the user in JSON
		return
	}
}

func CreateUser(c *gin.Context, db *sql.DB) {
	var newUser User
	// Bind sent data to newUser
	err := c.ShouldBindJSON(&newUser)
	if err != nil {
		// There was an issue binding the data
		c.JSON(http.StatusBadRequest, gin.H{"error": "failedToBindData"})
		return
	}

	// Hash the password
	hashedPassword, err := global.HashPassword(newUser.Password)
	if err != nil {
		// There was an issue with hashing
		c.JSON(http.StatusBadRequest, gin.H{"error": "failedToHashPassword"})
		return
	}

	// Insert into the database
	insertSQL := `INSERT INTO users (email, password) VALUES (?, ?)`
	result, err := db.Exec(insertSQL, newUser.Email, hashedPassword)
	if err != nil {
		// There was an issue with inserting
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	newUserId, err := result.LastInsertId()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failedToRetrieveUID"})
	}

	c.JSON(http.StatusCreated, gin.H{"id": newUserId}) // return a message containing the user's ID
}

func DeleteUserById(c *gin.Context, db *sql.DB) {
	id := c.Query("id")

	// Delete the user with given ID
	result, err := db.Exec("DELETE FROM users WHERE id = ?", id)
	if err != nil {
		// There was an issue with deleting the user
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete user"})
		return
	}

	rowsAffected, err := result.RowsAffected() // Get the number of affected rows
	if err != nil {
		// There was an issue getting the number of affected rows
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get affected rows"})
		return
	}
	if rowsAffected == 0 {
		// No row was affected => User was not found
		c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "User deleted successfully"}) // Return a message
}

func Login(c *gin.Context, db *sql.DB) {
	var passedData User
	// Bind sent data to passedUser
	err := c.ShouldBindJSON(&passedData)
	if err != nil {
		// There was an issue binding the data
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// email, password store the passed data
	email := passedData.Email
	password := passedData.Password

	// passwordDB will store data from the database
	var ID int
	var passwordDB string

	// Find user with the given email, bind his ID to ID and his password to passwordDB
	err = db.QueryRow("SELECT id, password FROM users WHERE email=?", email).Scan(&ID, &passwordDB)
	if err == sql.ErrNoRows {
		// No user found with the given email
		c.JSON(http.StatusNotFound, gin.H{"status": "userNotFound"})
		return
	}
	if err != nil {
		// There was an issue going querying the database
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve user"})
		return
	}

	// Compare password from database to the passed password
	err = bcrypt.CompareHashAndPassword([]byte(passwordDB), []byte(password))
	if err != nil {
		// The passwords don't match
		c.JSON(http.StatusUnauthorized, gin.H{"status": "wrongPassword"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"status": "loggedIn", "id": ID}) // return a message containing the user's ID
}

func AddUserInfo(c *gin.Context, db *sql.DB) {
	var passedData User

	err := c.ShouldBindJSON(&passedData)
	if err != nil {
		// There was an issue binding the data
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	result, err := db.Exec("UPDATE users SET firstName=?, lastName=?, location=? WHERE id=?", passedData.FirstName, passedData.LastName, passedData.Location, passedData.Id)
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
		// user not found
		c.JSON(http.StatusBadRequest, gin.H{"message": "userNotFound"})
		return
	}

	fmt.Println(passedData.Id)

	c.JSON(http.StatusOK, gin.H{"message": "success"})
}
