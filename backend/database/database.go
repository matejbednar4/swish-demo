package database

import (
	"database/sql"
	"log"
)

func OpenDatabase() *sql.DB {
	db, err := sql.Open("sqlite3", "./database/swish.db")

	if err != nil {
		log.Fatalf("Error opening database: %v", err)
	}
	return db
}

func CreateTables(db *sql.DB) {
	createCustomersTable(db)
	createBusinessesTable(db)
	createPostsTable(db)
}

func createCustomersTable(db *sql.DB) {
	query := `CREATE TABLE IF NOT EXISTS customers (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email VARCHAR(255) UNIQUE NOT NULL,
		password TEXT NOT NULL,
		first_name VARCHAR(30),
		last_name VARCHAR(30),
		address VARCHAR(255),
		score INTEGER NOT NULL DEFAULT 5,
		balance INTEGER NOT NULL DEFAULT 0,
		created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		filled INTEGER NOT NULL DEFAULT 0
		);
	`

	_, err := db.Exec(query)
	if err != nil {
		log.Printf("Error creating customers table: %v", err)
	}
}

func createBusinessesTable(db *sql.DB) {
	query := `CREATE TABLE IF NOT EXISTS businesses (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email VARCHAR(255) UNIQUE NOT NULL,
		password TEXT NOT NULL,
		name VARCHAR(255),
		address VARCHAR(255),
		type VARCHAR(30),
		created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
		filled INTEGER NOT NULL DEFAULT 0
		);
	`

	_, err := db.Exec(query)
	if err != nil {
		log.Printf("Error creating businesses table: %v", err)
	}
}

func createPostsTable(db *sql.DB) {
	query := `CREATE TABLE IF NOT EXISTS posts (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		customer_id INTEGER NOT NULL,
		business_id INTEGER NOT NULL,
		url TEXT NOT NULL,
		uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (customer_id) REFERENCES customers(id),
		FOREIGN KEY (business_id) REFERENCES businesses(id)
	);`

	_, err := db.Exec(query)
	if err != nil {
		log.Printf("Error creating posts table: %v", err)
	}
}
