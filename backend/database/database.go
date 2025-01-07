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

	_, err = db.Exec("PRAGMA foreign_keys = ON;")
	if err != nil {
		log.Fatalf("Error enabling foreign keys: %v", err)
	}

	return db
}

func CreateTables(db *sql.DB) {
	createCustomersTable(db)
	createBusinessesTable(db)
	createBusinessTypesTable(db)
	createPostsTable(db)
}

func createCustomersTable(db *sql.DB) {
	query := `CREATE TABLE IF NOT EXISTS customers (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email VARCHAR(255) UNIQUE NOT NULL,
		profile_pic_url VARCHAR(255),
		password TEXT NOT NULL,
		first_name VARCHAR(30),
		last_name VARCHAR(30),
		address VARCHAR(255),
		rating INTEGER NOT NULL DEFAULT 50,
		balance INTEGER NOT NULL DEFAULT 0,
		visited_places NOT NULL DEFAULT 0,
		total_rewards NOT NULL DEFAULT 0,
		sold_images NOT NULL DEFAULT 0,
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
		filled INTEGER NOT NULL DEFAULT 0,
		FOREIGN KEY (type) REFERENCES business_types(name)
		);
	`

	_, err := db.Exec(query)
	if err != nil {
		log.Printf("Error creating businesses table: %v", err)
	}
}

func createBusinessTypesTable(db *sql.DB) {
	query := `CREATE TABLE IF NOT EXISTS business_types (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name VARCHAR(30) UNIQUE NOT NULL
		);
	`

	_, err := db.Exec(query)
	if err != nil {
		log.Printf("Error creating business types table: %v", err)
	}

	query = `INSERT OR IGNORE INTO business_types (name) VALUES ('restaurant'), ('gym'), ('sauna'), ('hotel'), ('cafe')`
	_, err = db.Exec(query)
	if err != nil {
		log.Printf("Error inserting into business_types table: %v", err)
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
