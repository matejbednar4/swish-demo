package businessesDb

import (
	"database/sql"
	"fmt"
)

func LaunchBusinessDb() *sql.DB {
	db, err := sql.Open("sqlite3", "./business/database/businesses.db")
	if err != nil {
		fmt.Printf("Error launching business database: %v", err)
	}
	return db
}

func CreateBusinessTable(db *sql.DB) {
	createTableSQL := `CREATE TABLE IF NOT EXISTS businesses (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		email TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL,
		businessName TEXT DEFAULT '',
		businessType TEXT DEFAULT '',
		location TEXT DEFAULT ''
	);`

	_, err := db.Exec(createTableSQL)
	if err != nil {
		fmt.Printf("Error creating table: %v", err)
	}
}
