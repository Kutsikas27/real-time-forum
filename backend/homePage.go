package funcs

import (
	"net/http"
	"text/template"
)

// Serves the homepage
func (h *HomePageHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	// set up home page
	if r.URL.Path != "/" {
		http.Error(w, "Error 404", http.StatusNotFound)
		return
	}

	tmpl, err := template.ParseFiles("frontend/html/index.html")
	CatchError(err)

	switch r.Method {
	case "GET":
		err = tmpl.Execute(w, h)
		CatchError(err)
	case "POST":

	default:
		http.Error(w, "Error 405", http.StatusMethodNotAllowed)
		return
	}
}
