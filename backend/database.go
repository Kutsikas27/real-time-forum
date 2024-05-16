package funcs

import (
	"database/sql"
	"fmt"
	"os"
)

func SetUpDataBase() *sql.DB {
	dbName := "database.db"

	// check if database exists, if not create new database
	if _, err := os.Stat(dbName); os.IsNotExist(err) {
		fmt.Println("Database does not exist, creating new database...")
		file, err := os.Create(dbName)
		CatchError(err)
		file.Close()
	}

	db, err := sql.Open("sqlite3", dbName)
	CatchError(err)
	defer db.Close()

	// TODO: create tables if they don't exist

	return db
}
