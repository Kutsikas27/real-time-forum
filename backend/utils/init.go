package helpers

import (
	"database/sql"
	"log"
	"os"

	_ "github.com/mattn/go-sqlite3"
)

var Db *sql.DB

func init() {
	var err error
	dbFile := "./backend/database/database.db"
	Db, err = sql.Open("sqlite3", dbFile)
	if err != nil {
		LogErr(err)
	}
	checker, err := os.ReadFile(dbFile)
	if err != nil {
		LogErr(err)
	}
	if len(checker) == 0 {
		sqlScript, _ := os.ReadFile("./backend/database/database.sql")
		_, err = Db.Exec(string(sqlScript))
		if err != nil {
			LogErr(err)
		}
	}
}

func LogErr(err error) {
	log.Println(err)
}
