package main

import (
	"fmt"
	"net/http"
	f "real-time-forum/backend" // functions in backend folder

	_ "github.com/mattn/go-sqlite3"
)

func main() {

	// should start with setting up database first in case something fucks up
	db := f.SetUpDataBase()

	// handle static files
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("./frontend/css"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("./frontend/js"))))

	home := f.HomePageHandler{DB: db}

	// using http.Handle is suposed to be better for bigger projects than HandleFunc
	// might need to do more reserch just in case
	http.Handle("/", &home)

	fmt.Println("Server listening on port 8080...")

	err := http.ListenAndServe(":8080", nil)
	f.CatchError(err)
}
