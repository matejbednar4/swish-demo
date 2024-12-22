package database

import (
	"database/sql"
	"fmt"
)

func LaunchDatabase() *sql.DB {
	db, err := sql.Open("sqlite3", "./users/users.db")
	if err != nil {
		fmt.Printf("Error launching database: %v", err)
	}
	return db
}

func CreateTable(db *sql.DB) {
	createTableSQL := `CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		firstName TEXT DEFAULT '',
		lastName TEXT DEFAULT '',
		location TEXT DEFAULT ''
	);`

	_, err := db.Exec(createTableSQL)
	if err != nil {
		fmt.Printf("Error creating table: %v", err)
	}
}
